import React, {useEffect, useState} from "react";
import {Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import supabase from "../../lib/supabase";
import styles from "./ProfileScreen.style";
import {getCurrentUser} from "../../../service/user/UserService";
import Loading from "../loading";
import icons from "../../../constants/icons";
import {Stack} from "expo-router";
import {COLORS} from "../../../constants/theme";
import images from "../../../constants/images";

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const handleSignOut = async () => {
        try {
            setLoading(true);
            const {error} = await supabase.auth.signOut();
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
                    headerTitleAlign: 'center', // Ensure the title is centered
                }}
            />

            <ScrollView>
                <View style={styles.profileCard}>
                    <Text style={styles.title}>{currentUser?.firstName} {currentUser?.name}</Text>

                    <Image
                        source={icons.profile}
                        style={styles.avatar}
                    />

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
