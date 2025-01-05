import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "./[item].style";
import {Stack, useGlobalSearchParams, useRouter} from "expo-router";
import images from "../../../constants/images";
import icons from "../../../constants/icons";
import React, {useEffect, useState} from "react";
import {COLORS} from "../../../constants/theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {getUserLinksForId} from "../../../service/userLink/UserLinkService";
import Loading from "../../../components/common/loading/Loading";
import {getUserForEmail} from "../../../service/user/UserService";

const LinkActivity = () => {
    const router = useRouter();
    const {item} = useGlobalSearchParams();
    const event = item ? JSON.parse(item) : null;
    const [loading, setLoading] = useState(false);
    const [userLinks, setUserLinks] = useState([]);


    function handleApplicantStatus(id, approved) {
        // Handle applicant status (approve)
        console.log(`Applicant with ID: ${id} is ${approved}`);
    }

    const fetchUserDataByEmail = async (email) => {
        try {
            const userData = await getUserForEmail(email); // Replace with your actual API/service call
            return userData;
        } catch (error) {
            console.log(`Error fetching data for email ${email}:`, error);
            return null; // Return null if there's an error
        }
    };

    const fetchUserLinksForId = async () => {
        try {
            setLoading(true);

            // Fetch user links
            const userLinksData = await getUserLinksForId(event.id);
            if (userLinksData) {
                // Fetch user data for each email
                const userLinksWithDetails = await Promise.all(
                    userLinksData.map(async (link) => {
                        const userData = await fetchUserDataByEmail(link.userEmail);
                        console.log("User Data:", userData); // Logs user data immediately
                        return {
                            ...link,
                            userDetails: userData, // Merge user data into the link
                        };
                    })
                );
                setUserLinks(userLinksWithDetails);
            } else {
                console.log("No user links data available.");
            }
        } catch (error) {
            console.log("Error fetching user links:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (event?.id) fetchUserLinksForId().then(r => r);
    }, [event?.id]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerTitleAlign: "center",
                    headerShown: true,
                    headerTitle: () => (
                        <Image
                            source={images.link}
                            style={{width: 40, height: 40, resizeMode: "contain"}}
                        />
                    ),
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image
                                source={icons.back}
                                resizeMode="contain"
                                style={{width: 20, height: 20}}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <ScrollView>
                {/* Event Overview */}
                <View style={styles.container}>
                    {event ? (
                        <>
                            <Text style={styles.title}>{event.name}</Text>
                            <Text style={styles.description}>{event.description}</Text>
                            <Text style={styles.detail}>Location: {event.location}</Text>
                            <Text style={styles.detail}>Date: {event.date}</Text>
                            <Text style={styles.detail}>
                                Time: {event.startTime} - {event.endTime}
                            </Text>
                            <Text style={styles.detail}>Type: {event.eventType}</Text>
                            <Text style={styles.detail}>Open Spots: 0/{event.maxPeople}</Text>
                            <Text style={styles.detail}>
                                Contact: {event.ownerEmail}
                            </Text>
                        </>
                    ) : (
                        <Text style={styles.loadingText}>Loading...</Text>
                    )}
                </View>

                {/* Applicants List */}
                <View style={styles.container}>
                    <Text style={styles.sectionTitle}>Applicants</Text>
                    {userLinks.length === 0 ? (
                        <Text style={styles.noApplicantsText}>No userLinks found.</Text>
                    ) : (
                        userLinks.map((link, index) => (
                            <View key={index} style={styles.applicantContainer}>
                                <Text style={styles.applicantName}>
                                    {link.userDetails?.[link.userDetails.length - 1]?.firstName} {link.userDetails?.[link.userDetails.length - 1]?.name}
                                </Text>
                                <Text style={styles.applicantEmail}>{link.userEmail}</Text>
                                <Text style={styles.applicantStatus}>
                                    Status: {link.status}
                                </Text>
                                <View style={styles.actionButtons}>
                                    <TouchableOpacity
                                        style={styles.viewProfileButton}
                                    >
                                        <Text style={styles.buttonText}>View Profile</Text>
                                    </TouchableOpacity>
                                    <View style={styles.approvalButtonsContainer}>
                                        <TouchableOpacity style={styles.declineProfileButton}>
                                            <FontAwesome name="times-circle" size={40} color="white"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.approveProfileButton}>
                                            <FontAwesome name="check-circle" size={40} color="white"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))
                    )}
                </View>
                <Loading loading={loading}/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LinkActivity;
