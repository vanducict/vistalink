import React from "react";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import supabase from "../../lib/supabase";
import styles from "./ProfileScreen.style";

const Profile = () => {
    const handleSignOut = async () => {
        try {
            const {error} = await supabase.auth.signOut();
            if (error) {
                Alert.alert("Error", error.message);
            } else {
                Alert.alert("Success", "You have signed out.");
                // Optionally, navigate to the login screen or another appropriate screen
            }
        } catch (err) {
            console.log("Error signing out:", err);
            Alert.alert("Error", "An unexpected error occurred.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};


export default Profile;
