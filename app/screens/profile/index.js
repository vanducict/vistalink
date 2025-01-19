import React, {useEffect, useState} from "react";
import {Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import supabase from "../../lib/supabase";
import styles from "./ProfileScreen.style";
import {getCurrentUser} from "../../../service/user/UserService";
import Loading from "../loading";
import {Stack} from "expo-router";
import {COLORS} from "../../../constants/theme";
import images from "../../../constants/images";
import {StreamChat} from "stream-chat";

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageUrls, setImageUrls] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const user = await getCurrentUser();
                if (user && user.length > 0) {
                    setCurrentUser(user.pop());
                } else {
                    console.log("No user data found.");
                }
            } catch (error) {
                console.log("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            if (!currentUser?.uid) return; // Ensure `currentUser` is loaded
            try {
                setLoading(true);
                const files = await fetchUserImages(currentUser.uid);
                const urls = await getPublicImageUrls(files, currentUser.uid);
                setImageUrls(urls); // Set the fetched URLs
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [currentUser]);

    const fetchUserImages = async (userId) => {
        try {
            const {data, error} = await supabase.storage
                .from('profileImages') // Replace with your bucket name
                .list(userId, {
                    limit: 100, // Limit the number of files fetched
                    offset: 0,  // Offset for pagination
                });

            if (error) {
                console.error('Error fetching images:', error.message);
                return [];
            }

            return data; // Returns an array of file objects
        } catch (error) {
            console.error('Error:', error.message);
            return [];
        }
    };

    const getPublicImageUrls = async (files, userId) => {
        const urls = files.map((file) => {
            const {data} = supabase.storage
                .from('profileImages')
                .getPublicUrl(`${userId}/${file.name}`);
            return data.publicUrl; // Extract and return the public URL
        });

        return urls; // Return the array of URLs
    };

    const handleSignOut = async () => {
        try {
            setLoading(true);
            const {error} = await supabase.auth.signOut();
            const chatClient = StreamChat.getInstance('vxujf6n9668d'); // Replace with your Stream API Key
            await chatClient.disconnectUser();
            if (error) {
                Alert.alert("Error", error.message);
            } else {
                Alert.alert("Success", "You have signed out.");
            }
        } catch (err) {
            console.log("Error signing out:", err);
            Alert.alert("Error", "An unexpected error occurred.");
        }
        setLoading(false);
    };

    if (loading) {
        return <Loading/>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                backgroundColor={COLORS.lightWhite}
                options={{
                    headerTitle: () => (
                        <Image
                            source={images.link} // Path to your image
                            style={{width: 40, height: 40, resizeMode: 'contain'}} // Adjust size
                        />
                    ),
                    headerShown: true,
                    headerTitleAlign: 'center', // Ensure the title is centered
                }}
            />

            <ScrollView>
                <View style={styles.profileCard}>
                    <Text style={styles.title}>{currentUser?.firstName} {currentUser?.name}</Text>
                    

                    <View style={styles.container}>
                        {imageUrls.length > 0 ? (
                            imageUrls.map((url, index) => (
                                <Image
                                    key={index}
                                    source={{uri: url}}
                                    style={styles.avatar}
                                />
                            ))
                        ) : (
                            <Text>No images found for this user.</Text>
                        )}
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.userEmail}>{currentUser?.email}</Text>
                        <Text style={styles.userBio}>{currentUser?.description || "No bio available"}</Text>
                        <Text style={styles.userType}>{currentUser?.userType}</Text>
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
