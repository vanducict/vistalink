import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Stack, useGlobalSearchParams, useRouter} from "expo-router";
import {COLORS} from "../../../constants/theme";
import icons from "../../../constants/icons";
import React, {useEffect, useState} from "react";
import styles from "./[item].style";
import images from "../../../constants/images";
import {createUserLink, getUserLinksForId} from "../../../service/userLink/UserLinkService";
import {getCurrentUser} from "../../../service/user/UserService";

const LinkDetail = () => {
    const {item} = useGlobalSearchParams();
    const event = item ? JSON.parse(item) : null;
    const router = useRouter();

    const [spotsTaken, setSpotsTaken] = useState(0);
    const totalSpots = event ? event.maxPeople : 1;
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userLinks, setUserLinks] = useState([]);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const user = await getCurrentUser();
            const currentUserData = user ? user.pop() : null;

            if (currentUserData) {
                setCurrentUser(currentUserData);
            } else {
                console.log("No user data available.");
            }
        } catch (error) {
            console.log("Error fetching user:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserLinksForId = async () => {
        try {
            setLoading(true);
            const userLinks = await getUserLinksForId(event.id);

            if (userLinks) {
                setUserLinks(userLinks);
                setSpotsTaken(userLinks.length);
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
        fetchUser();
        if (event?.id) fetchUserLinksForId();
    }, [event?.id]);

    async function registerToLink() {
        if (!currentUser || loading) return;

        try {
            setLoading(true);
            await createUserLink(event.id, currentUser.email); // Register the user

            // Refetch user links after registration
            await fetchUserLinksForId();
        } catch (error) {
            console.error("Error registering to link:", error);
        } finally {
            setLoading(false);
        }
    }

    const isUserRegistered = userLinks.some(link => link.userEmail === currentUser?.email);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerTitleAlign: "center",
                    headerShown: true,
                    headerTitle: () => (
                        <Image
                            source={images.link}
                            style={{width: 40, height: 40, resizeMode: 'contain'}}
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
                                Open Spots: 0/{totalSpots}
                            </Text>
                            <Text style={styles.detail}>
                                Contact: {event.ownerEmail}
                            </Text>
                        </>
                    ) : (
                        <Text style={styles.loadingText}>Loading...</Text>
                    )}
                </View>
                <TouchableOpacity
                    style={[
                        styles.applyButton,
                        (spotsTaken >= totalSpots || isUserRegistered) && {backgroundColor: COLORS.gray} // Turn gray if full or registered
                    ]}
                    onPress={registerToLink}
                    disabled={spotsTaken >= totalSpots || isUserRegistered || loading} // Disable if full, registered, or loading
                >
                    <Text style={styles.applyButtonText}>
                        {loading
                            ? "Loading..."
                            : isUserRegistered
                                ? "Applied"
                                : "Apply"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LinkDetail;
