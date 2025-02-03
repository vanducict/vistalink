import {Image, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "./[item].style";
import {useGlobalSearchParams, useRouter} from "expo-router";
import images from "../../../constants/images";
import icons from "../../../constants/icons";
import React, {useEffect, useState} from "react";
import {COLORS} from "../../../constants/theme";
import {getUserLinksForId} from "../../../service/userLink/UserLinkService";
import Loading from "../../../components/common/loading/Loading";
import {getCurrentUser, getUserForEmail} from "../../../service/user/UserService";
import Applicants from "../../../components/linkActivity/applicants/Applicants";
import Status from "../../../components/linkActivity/status/Status";

const LinkActivity = () => {
    const router = useRouter();
    const {item} = useGlobalSearchParams();
    const event = item ? JSON.parse(item) : null;
    const [loading, setLoading] = useState(false);
    const [userLinks, setUserLinks] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);


    const fetchUser = async () => {
        try {
            setLoading(true);
            const user = await getCurrentUser();
            if (user && user.length > 0) {
                setCurrentUser(user.pop());
            } else {
                console.log("No user data found.");
            }
        }
        catch (error) {
            console.log("Error fetching user:", error);
        }
        finally {
            setLoading(false);
        }
    };


    const fetchUserDataByEmail = async (email) => {
        try {
            const userData = await getUserForEmail(email); // Replace with your actual API/service call
            return userData;
        }
        catch (error) {
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

                // Sort userLinksWithDetails by linkId to ensure consistent order
                const sortedUserLinks = userLinksWithDetails.sort((a, b) => a.linkId - b.linkId);
                setUserLinks(sortedUserLinks);
            } else {
                console.log("No user links data available.");
            }
        }
        catch (error) {
            console.log("Error fetching user links:", error);
        }
        finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (event?.id) {
            fetchUserLinksForId().then(r => r);
        }
        fetchUser().then(r => r);
    }, [event?.id]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={icons.back} resizeMode="contain" style={styles.backButtonIcon}/>
                </TouchableOpacity>
                <Image source={images.link} style={styles.headerLogo}/>
            </View>

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchUserLinksForId}/>
                }>
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
                            <Text style={styles.detail}>
                                Open
                                Spots: {(event.maxPeople) - userLinks.filter(link => link.status === 'approved').length}/{event.maxPeople}
                            </Text>

                            <Text style={styles.detail}>
                                Contact: {event.ownerEmail}
                            </Text>
                        </>
                    ) : (
                        <Text style={styles.loadingText}>Loading...</Text>
                    )}
                </View>

                <ScrollView>
                    {currentUser?.userType === "Collaborator" ?
                        <Status link={userLinks.find(link => link.userEmail === currentUser?.email)}
                                event={event}/>
                        : <Applicants
                            userLinks={userLinks}
                            event={event}
                            refreshUserLinks={fetchUserLinksForId}
                        />}

                    <Loading loading={loading}/>
                </ScrollView>

            </ScrollView>
        </SafeAreaView>
    );
};

export default LinkActivity;
