import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from "./LinksScreen.style";
import {Stack, useRouter} from "expo-router";
import images from "../../../constants/images";
import {getCurrentUser} from "../../../service/user/UserService";
import {getAllLinksForId, getAllLinksForUserConsumer} from "../../../service/link/LinkService";
import Loading from "../loading";
import {getAllLinksForUserCollaborator} from "../../../service/userLink/UserLinkService";


const Links = () => {

    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("Active"); // "Active" or "Expired"
    const router = useRouter();
    const filteredLinks = links.filter((link) => {
        // Filter based on the selected tab using the expired field
        return activeTab === "Active" ? !link?.expired : link?.expired;
    });

    // Fetch user data once on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const user = await getCurrentUser();
                setCurrentUser(user.pop()); // Set user once data is fetched
            } catch (error) {
                setError("Error fetching user");
                console.log("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser().then(r => r);
    }, []); // Only run once when the component mounts

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
                            return linkData?.pop() || null; // Pop and return the last element, or null if empty
                        } else {
                            console.warn("linkObj or linkId is missing:", linkObj);
                            return null;
                        }
                    })
                );

                return effectiveLinks.filter(link => link !== null); // Filter out null values
            };

            // Fetch links depending on the user type
            if (currentUser.userType === "Consumer") {
                fetchedLinks = await getAllLinksForUserConsumer(currentUser);
            } else if (currentUser.userType === "Collaborator") {
                const collaboratorLinks = await getAllLinksForUserCollaborator(currentUser);
                console.log("Collaborator Links:", collaboratorLinks);
                fetchedLinks = await fetchCollaboratorLinks(collaboratorLinks);
            }

            setLinks(fetchedLinks);  // Update state with the fetched links
            console.log("Links fetched:", fetchedLinks);

        } catch (error) {
            setError("Error fetching links");
            console.error("Error fetching links:", error);
        } finally {
            setLoading(false);  // Set loading to false once the fetching is complete
        }
    };


    useEffect(() => {
        if (currentUser) {
            fetchLinks();
        }
    }, [currentUser]);


    // Display loading state or error message
    if (loading) {
        return (
            <Loading/>
        );
    }

    function viewLinkActivity(link) {
        router.push({
            pathname: '/screens/linkActivity/[item]', // Dynamic route
            params: {item: JSON.stringify(link)}, // Pass the link as a string
        });
    }


    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={styles.container}>
                {/* Header */}
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
                            Expired
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Links List */}
                {filteredLinks.length === 0 ? (
                    <Text>No {activeTab.toLowerCase()} links available.</Text>
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
                                onPress={() => viewLinkActivity(link)} // Use link here
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
