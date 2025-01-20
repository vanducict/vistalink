import React, {useEffect} from "react";
import {Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "./UserProfileScreen.style";

const UserProfile = ({visible, userDetails, onClose}) => {
    useEffect(() => {
        console.log("User details: ", userDetails);
    }, []);


    const calculateAge = (birthDate) => {
        const birthDateObj = new Date(birthDate);
        const currentDate = new Date();
        let age = currentDate.getFullYear() - birthDateObj.getFullYear();
        const month = currentDate.getMonth();
        if (month < birthDateObj.getMonth() || (month === birthDateObj.getMonth() && currentDate.getDate() < birthDateObj.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>{userDetails?.firstName} {userDetails?.name}</Text>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {userDetails ? (
                            <>
                                <View style={styles.infoGroup}>
                                    <Text style={styles.infoLabel}>Age</Text>
                                    <Text style={styles.infoValue}>{calculateAge(userDetails.birthDate)}</Text>
                                </View>
                                <View style={styles.infoGroup}>
                                    <Text style={styles.infoLabel}>Biography:</Text>
                                    <Text style={styles.infoValue}>{userDetails.description}</Text>
                                </View>
                                <View style={styles.infoGroup}>
                                    <Text style={styles.infoLabel}>Email:</Text>
                                    <Text style={styles.infoValue}>{userDetails.email}</Text>
                                </View>
                            </>
                        ) : (
                            <Text style={styles.noDetailsText}>No user details available.</Text>
                        )}
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


export default UserProfile;
