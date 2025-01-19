import React, {useEffect, useState} from "react";
import {
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {Stack, useRouter} from "expo-router";
import styles from "./RegisterScreen.style";
import {COLORS} from "../../../constants/theme";
import Loading from "../../../components/common/loading/Loading";
import images from "../../../constants/images";
import supabase from "../../lib/supabase";
import {getAllUserTypes, insertUser} from "../../../service/user/UserService";
import icons from "../../../constants/icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {StreamChat} from "stream-chat";
import * as ImagePicker from 'expo-image-picker';
import {decode} from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState(""); // To store the selected date
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [userType, setUserType] = useState("");
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [user, setUser] = useState();
    const [selectedImage, setSelectedImage] = useState(null);  // Store selected image

    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                const types = await getAllUserTypes();
                if (types && types.length > 0) {
                    const formattedItems = types.map((type, index) => ({
                        label: type,
                        value: type,
                        key: `${type}-${index}`,
                    }));
                    setItems(formattedItems);
                } else {
                    console.log("No types found.");
                }
            } catch (error) {
                console.log("Error fetching types:", error);
            }
        };
        fetchUserTypes().then(r => r);
    }, []);

    const handleConfirmDate = (date) => {
        const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        setBirthdate(formattedDate);
        setDatePickerVisible(false); // Hide the date picker after selection
    };

    const retryAsync = async (fn, retries = 3) => {
        for (let i = 0; i < retries; i++) {
            try {
                return await fn();
            } catch (error) {
                console.error(`Attempt ${i + 1} failed:`, error);
                if (i === retries - 1) throw error;
            }
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
        } catch (error) {
            console.error("Error creating/updating user in Stream Chat:", error);
        }
    };

    const signUp = async (user) => {
        try {
            Keyboard.dismiss();
            setLoading(true);
            await retryAsync(() =>
                insertUser(user, email.toLowerCase(), name, firstName, birthdate, description, userType)
            );
            console.log(`${email} signed up successfully.`);
        } catch (error) {
            console.log("Error signing up:", error);
        }
    };

    const uploadImage = async (userId) => {
        if (!selectedImage) return null;

        try {
            const base64 = await FileSystem.readAsStringAsync(selectedImage.uri, {
                encoding: 'base64',
            });

            const filePath = `${userId}/${new Date().getTime()}.${selectedImage.type === 'image' ? 'png' : 'mp4'}`;
            const contentType = selectedImage.type === 'image' ? 'image/png' : 'video/mp4';

            console.log('Uploading image to Supabase...');
            console.log('User ID:', userId);
            console.log('File Path:', filePath);
            console.log('Content Type:', contentType);

            const {data, error} = await supabase.storage
                .from('profileImages')
                .upload(filePath, decode(base64), {
                    contentType,
                    cacheControl: '3600',
                    upsert: true,
                });

            if (error) {
                console.error('Error uploading image:', error.message);
                Alert.alert('Error', error.message);
            } else {
                console.log('Upload successful:', data);
                return data.Key; // Return the uploaded image key for later use
            }
        } catch (error) {
            console.error('Error processing image:', error.message);
            Alert.alert('Error', 'An error occurred while processing the image.');
        }
    };

    const onSelectImage = async () => {
        // Request image picker permissions
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'We need permission to access your media library.');
            return;
        }

        // Open the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0]); // Save the selected image
        }
    };

    const handleRegister = async () => {
        if (!email || !password || !birthdate || !name || !firstName || !description) {
            Alert.alert("Error", "Please fill in all the fields.");
            return;
        }

        try {
            Keyboard.dismiss();
            setLoading(true);

            const {data: user, error} = await supabase.auth.signUp({
                email: email.toLowerCase(),
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: name,
                    },
                },
            });

            if (user) {
                await signUp(user);
                await createStreamChatUser(user);
                setUser(user); // Store user data after successful registration
                await uploadImage(user?.user?.id);
            } else if (error) {
                console.error('Error signing up:', error.message);
                throw new Error(error.message);
            }

            if (!user) {
                throw new Error("User registration failed. Please try again.");
            }

            Alert.alert("Success", "Confirmation email sent. Please verify your email.");
            setLoading(false);
            router.replace("/");
        } catch (error) {
            Alert.alert("Error", error.message);
            console.error("Error signing up:", error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen
                backgroundColor={COLORS.lightWhite}
                options={{
                    headerShown: true,
                    headerTitle: () => (
                        <Image
                            source={images.link}
                            style={{width: 40, height: 40, resizeMode: "contain"}}
                        />
                    ),
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.replace("/screens/login")}>
                            <Image
                                source={icons.back}
                                resizeMode="contain"
                                style={{width: 20, height: 20}}
                            />
                        </TouchableOpacity>
                    ),
                    headerTitleAlign: "center",
                }}
            />

            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholderTextColor="#888"
                />

                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setDatePickerVisible(true)}
                >
                    <Text style={styles.inputText}>
                        {birthdate || "Tap to select birthdate"}
                    </Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    placeholderTextColor="#888"
                />

                <DropDownPicker
                    style={styles.roleDropdown}
                    open={open}
                    value={userType}
                    items={items}
                    setOpen={setOpen}
                    placeholder="Select a role"
                    setValue={setUserType}
                    setItems={setItems}
                />

                <TouchableOpacity style={styles.addImageButton} onPress={onSelectImage}>
                    <Text style={styles.registerButtonText}>Add Image</Text>
                </TouchableOpacity>

                {selectedImage ? (
                    <>
                        <Image
                            source={{uri: selectedImage.uri}}
                            style={{width: 100, height: 100, borderRadius: 10, marginTop: 10}}
                        />
                        <Text style={{marginTop: 5}}>Uploaded: {selectedImage.fileName || 'Image'}</Text>
                    </>
                ) : (
                    <Text style={{marginTop: 10}}>No image selected</Text>
                )}


                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>
                        {loading ? <Loading loading={loading}/> : "Register"}
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={() => setDatePickerVisible(false)}
            />
        </SafeAreaView>
    );
};

export default Register;
