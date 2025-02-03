import {Alert, Keyboard} from "react-native";
import supabase from "../../app/lib/supabase";
import {insertUser} from "../user/UserService";
import * as FileSystem from 'expo-file-system';
import {StreamChat} from "stream-chat";
import {Buffer} from "buffer"; // Required to decode Base64 for Supabase

export const handleRegister = async (data) => {
    if (!data) {
        Alert.alert("Error", "Please fill in all the fields.");
        return;
    }

    console.log(data);

    try {
        Keyboard.dismiss();
        const {data: user, error} = await supabase.auth.signUp({
            email: data?.email?.toLowerCase(),
            password: data?.password,
            options: {
                data: {
                    first_name: data?.firstName,
                    last_name: data?.name,
                },
            },
        });

        if (user) {
            await signUp(user, data);
            await createStreamChatUser(user);
            await uploadImages(user?.user?.id, data);
        } else if (error) {
            console.error('Error signing up:', error.message);
            throw new Error(error.message);
        }
        if (!user) {
            throw new Error("User registration failed. Please try again.");
        }

        Alert.alert("Success", "Confirmation email sent. Please verify your email.");
    }
    catch (error) {
        Alert.alert("Error", error.message);
        console.error("Error signing up:", error);
    }
};


const createStreamChatUser = async (supabaseUser) => {
    try {
        if (!supabaseUser || !supabaseUser.user) {
            return;
        }

        const {id, email, user_metadata} = supabaseUser.user;

        if (!user_metadata || !user_metadata.first_name || !user_metadata.last_name) {
            console.error("User metadata is incomplete:", user_metadata);
            return;
        }

        // Create user's full name
        const name = `${user_metadata.first_name} ${user_metadata.last_name}`;
        console.log("Creating StreamChat user:", {id, email, name});

        const chatClient = new StreamChat('vxujf6n9668d');

        if (chatClient.user) {
            console.log("Disconnecting existing user...");
            await chatClient.disconnectUser();
            console.log("User disconnected successfully.");
        }

        const serverToken = chatClient.devToken(id);

        await chatClient.connectUser({id, email, name}, serverToken);
        console.log("User connected to StreamChat:", {id, name});

        await chatClient.upsertUser({id, role: "user", email, name});

        console.log("User created/updated in StreamChat:", {id, name});

        await chatClient.disconnectUser();
        console.log("User disconnected after operation.");
    }
    catch (error) {
        console.error("Error creating/updating user in Stream Chat:", error);
    }
};

const signUp = async (user, data) => {
    try {
        Keyboard.dismiss();
        await retryAsync(() =>
            insertUser(user,
                data?.email?.toLowerCase(),
                data?.name,
                data?.firstName,
                data?.birthDate,
                data?.description,
                data?.userType,
                data?.selectedInterests,
                data?.jobTitle,
                data?.question1,
                data?.question2,
                data?.question3,
            )
        );
        console.log(`${data?.email.toLowerCase()} signed up successfully.`);
    }
    catch (error) {
        console.log("Error signing up:", error);
    }
};

const uploadImages = async (userId, data) => {
    if (!data?.images || !Array.isArray(data.images) || data.images.length === 0) {
        console.log("No images to upload or invalid input.");
        return [];
    }

    try {
        const uploadedImagePaths = [];

        for (const imageUri of data.images) {
            if (typeof imageUri !== "string" || !imageUri.startsWith("file://")) {
                console.warn("Skipping invalid image URI:", imageUri);
                continue;
            }

            console.log("Processing image:", imageUri);

            // Convert image to Base64
            const base64 = await FileSystem.readAsStringAsync(imageUri, {encoding: "base64"});

            // Decode base64 to binary
            const imageBuffer = Buffer.from(base64, "base64");

            const fileType = imageUri.endsWith(".jpg") ? "jpg" : "png";
            const filePath = `${userId}/${Date.now()}.${fileType}`;
            const contentType = fileType === "jpg" ? "image/jpeg" : "image/png";

            console.log("Uploading:", filePath);

            // Upload to Supabase
            const {data: uploadData, error} = await supabase.storage
                .from("profileImages")
                .upload(filePath, imageBuffer, {
                    contentType,
                    cacheControl: "3600",
                    upsert: true,
                });

            if (error) {
                console.error("Upload failed:", error.message);
            } else {
                console.log("Upload successful:", uploadData);
                uploadedImagePaths.push(uploadData.path);  // Use `path` instead of `Key`
            }
        }

        return uploadedImagePaths;
    }
    catch (error) {
        console.error("Error processing images:", error.message);
        return [];
    }
};


const retryAsync = async (fn, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        }
        catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            if (i === retries - 1) {
                throw error;
            }
        }
    }
};


