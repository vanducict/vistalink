import React, {useEffect, useState} from "react";
import {Image, Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Swiper from 'react-native-swiper'; // Import swiper
import styles from "./UserProfileScreen.style";
import supabase from "../../lib/supabase";
import Loading from "../../../components/common/loading/Loading";

const UserProfile = ({visible, userDetails, onClose}) => {
    const [imageUrls, setImageUrls] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log("User details: ", userDetails);
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            if (!userDetails?.uid) {
                return;
            } // Ensure `currentUser` is loaded
            try {
                setLoading(true);
                const files = await fetchUserImages(userDetails?.uid);
                const urls = await getPublicImageUrls(files, userDetails?.uid);
                setImageUrls(urls); // Set the fetched URLs
            }
            catch (error) {
                console.error("Error fetching images:", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchImages().then(r => r);
    }, [userDetails]);

    const fetchUserImages = async (userId) => {
        try {
            const {data, error} = await supabase.storage
                .from('profileImages') // Ensure this is the correct bucket name
                .list(userId, {
                    limit: 100,
                    offset: 0,
                });

            if (error) {
                console.error('Error fetching images:', error.message);
                return [];
            }

            console.log("Fetched files:", data); // Log the files for debugging
            return data || []; // Return the files, or an empty array if `data` is null
        }
        catch (error) {
            console.error('Error fetching user images:', error.message);
            return [];
        }
    };

    const getPublicImageUrls = async (files, userId) => {
        try {
            const urls = files.map((file) => {
                const {data, error} = supabase.storage
                    .from('profileImages')
                    .getPublicUrl(`${userId}/${file.name}`); // Construct path using userId and file name

                if (error) {
                    console.error(`Error getting public URL for file ${file.name}:`, error.message);
                    return null; // Return null for errors
                }

                return data?.publicUrl; // Return the public URL if available
            });

            console.log("Generated URLs:", urls); // Log URLs for debugging
            return urls.filter(Boolean); // Filter out null values
        }
        catch (error) {
            console.error('Error generating public image URLs:', error.message);
            return [];
        }
    };

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
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {userDetails ? (
                            <>
                                {loading ? ( // Display loading indicator while fetching
                                    <Loading loading={loading}/>
                                ) : (
                                    <View style={[styles.infoGroup, styles.imageContainer]}>
                                        {/* Swiper component for images */}
                                        <Swiper
                                            style={styles.swiper}
                                            showsPagination={true} // Add pagination dots
                                            loop={false} // Disable looping if you don't want to loop images
                                            autoplay={false} // Disable autoplay, or set to true for auto scrolling
                                            paginationStyle={styles.paginationStyle} // Apply custom pagination style
                                        >
                                            {imageUrls.map((url, index) => (
                                                <View key={index} style={styles.imageWrapper}>
                                                    <Image
                                                        source={{uri: url}}
                                                        style={styles.avatar}
                                                    />
                                                    {/* Display name at bottom-right of the image */}
                                                    <Text
                                                        style={styles.imageName}>
                                                        {userDetails?.firstName} {userDetails?.name}, {calculateAge(userDetails.birthDate)}
                                                    </Text>
                                                </View>
                                            ))}
                                        </Swiper>
                                    </View>
                                )}
                                <View style={styles.infoGroup}>
                                    <Text style={styles.infoLabel}>Biography:</Text>
                                    <Text style={styles.infoValue}>{userDetails.description}</Text>
                                </View>
                                <View style={styles.infoGroup}>
                                    <Text style={styles.infoLabel}>Email:</Text>
                                    <Text style={styles.infoValue}>{userDetails.email}</Text>
                                </View>
                                <View style={styles.infoGroup}>
                                    <Text style={styles.infoLabel}>Email:</Text>
                                    <Text style={styles.infoValue}>{userDetails.jobTitle}</Text>
                                </View>
                                <View style={styles.infoGroup}>
                                    <Text style={styles.infoLabel}>Interests:</Text>
                                    {userDetails.selectedInterests && userDetails.selectedInterests.length > 0 ? (
                                        <View style={styles.interestsList}>
                                            {userDetails.selectedInterests.map((interest, index) => (
                                                <View key={index} style={styles.interestItemContainer}>
                                                    <Text style={styles.interestItem}>{interest}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    ) : (
                                        <Text style={styles.noInterestsText}>No interests available.</Text>
                                    )}
                                </View>

                                <View style={styles.infoGroup}>
                                    <Text style={styles.infoLabel}>What is something you're passionate about?</Text>
                                    <Text style={styles.infoValue}>{userDetails.question1}</Text>
                                </View>
                                <View style={styles.infoGroup}>
                                    <Text style={styles.infoLabel}>If you could visit any place in the world, where
                                        would it be?</Text>
                                    <Text style={styles.infoValue}>{userDetails.question2}</Text>
                                </View>
                                <View style={styles.infoGroup}>
                                    <Text style={styles.infoLabel}>What is a fun fact about yourself?</Text>
                                    <Text style={styles.infoValue}>{userDetails.question3}</Text>
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
