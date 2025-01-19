import React, {useCallback, useEffect, useState} from 'react';
import {Image, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View,} from 'react-native';
import styles from "./LinksScreen.style";
import {Stack, useRouter} from "expo-router";
import images from "../../../constants/images";
import {getCurrentUser} from "../../../service/user/UserService";
import {getAllLinksForId, getAllLinksForUserConsumer} from "../../../service/link/LinkService";
import {getAllLinksForUserCollaborator} from "../../../service/userLink/UserLinkService";
import Lottie from "lottie-react-native";
import animations from "../../../constants/animations";
import {useFocusEffect} from "@react-navigation/native";
import Loading from "../../../components/common/loading/Loading";

const Links = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("Active"); // "Active" or "Expired"
    const router = useRouter();

    const filteredLinks = links.filter((link) => {
        if (activeTab === "Active") {
            return !link?.expired && !link?.closed; // Active links are neither expired nor closed
        } else {
            return link?.expired || link?.closed; // Expired tab includes expired or closed links
        }
    });


    // Fetch user data once on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const user = await getCurrentUser();
                setCurrentUser(user.pop());
            } catch (error) {
                setError("Error fetching user");
                console.log("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser().then((r) => r);
    }, []);

    const fetchLinks = async () => {
        try {
            setLoading(true);

            let fetchedLinks = [];

            // Function to handle fetching links for a collaborator
            const fetchCollaboratorLinks = async (collaboratorLinks) => {
                const effectiveLinks = await Promise.all(
                    collaboratorLinks.map(async (linkObj) => {
                        const linkId = linkObj?.linkId || linkObj?.id;
                        if (linkId) {
                            const linkData = await getAllLinksForId(linkId);
                            return linkData?.pop() || null;
                        } else {
                            console.warn("linkObj or linkId is missing:", linkObj);
                            return null;
                        }
                    })
                );

                return effectiveLinks.filter((link) => link !== null);
            };

            // Fetch links depending on the user type
            if (currentUser.userType === "Consumer") {
                fetchedLinks = await getAllLinksForUserConsumer(currentUser);
            } else if (currentUser.userType === "Collaborator") {
                const collaboratorLinks = await getAllLinksForUserCollaborator(currentUser);
                console.log("Collaborator Links:", collaboratorLinks);
                fetchedLinks = await fetchCollaboratorLinks(collaboratorLinks);
            }

            setLinks(fetchedLinks);
            console.log("Links fetched:", fetchedLinks);
        } catch (error) {
            setError("Error fetching links");
            console.error("Error fetching links:", error);
        } finally {
            setLoading(false);
            setRefreshing(false); // Ensure refreshing is false after completion
        }
    };

    // Use `useFocusEffect` to refetch data when navigating back
    useFocusEffect(
        useCallback(() => {
            if (currentUser) {
                fetchLinks().then(r => r);
            }
        }, [currentUser])
    );

    // Pull-to-refresh handler
    const onRefresh = () => {
        setRefreshing(true);
        fetchLinks();
    };

    function viewLinkActivity(link) {
        router.push({
            pathname: "/screens/linkActivity/[item]",
            params: {item: JSON.stringify(link)},
        });
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
            >
                {/* Header */}
                <Stack.Screen
                    options={{
                        headerTitleAlign: "center",
                        headerShown: false,
                        headerTitle: () => (
                            <Image
                                source={images.link}
                                style={{width: 40, height: 40, resizeMode: "contain"}}
                            />
                        ),
                    }}
                />

                {/* Tab Switch */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === "Active" && styles.activeTabButton,
                        ]}
                        onPress={() => setActiveTab("Active")}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === "Active" && styles.activeTabText,
                            ]}
                        >
                            Active
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === "Expired" && styles.activeTabButton,
                        ]}
                        onPress={() => setActiveTab("Expired")}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === "Expired" && styles.activeTabText,
                            ]}
                        >
                            Closed
                        </Text>
                    </TouchableOpacity>
                </View>


                {/* Links List */}
                {filteredLinks.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Loading loading={loading}/>
                        <Lottie
                            source={animations.empty}
                            autoPlay
                            loop
                            style={{width: 100, height: 100}}
                        />
                        <Text style={styles.emptyText}>
                            {activeTab === "Active"
                                ? "No active links available."
                                : "No closed links."}
                        </Text>
                    </View>
                ) : (
                    filteredLinks.map((link, index) => (
                        <View key={index} style={styles.activityContainer}>
                            <View style={styles.activityDetails}>
                                <Text style={styles.activityTitle}>{link?.name}</Text>
                                <Text style={styles.activityDate}>{link?.date}</Text>
                                <Text style={styles.activityLocation}>
                                    Location: {link?.location}
                                </Text>
                                <Text style={styles.activityTime}>
                                    Starts at: {link?.startTime} - Ends at: {link?.endTime}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => viewLinkActivity(link)}
                            >
                                <Text style={styles.buttonText}>View</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Links;
