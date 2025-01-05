import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from "./LinksScreen.style";
import {Stack, useRouter} from "expo-router";
import images from "../../../constants/images";
import {getCurrentUser} from "../../../service/user/UserService";
import {getAllLinksForUser} from "../../../service/link/LinkService";
import Loading from "../loading";


const Links = () => {

    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("Active"); // "Active" or "Expired"
    const router = useRouter();
    const filteredLinks = links.filter((link) => {
        // Convert the link.date string (YYYY-MM-DD) to a Date object
        const linkDate = new Date(link.date);

        // Get today's date without the time component
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

        // Filter based on the selected tab
        return activeTab === "Active" ? linkDate >= today : linkDate < today;
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

    // Fetch links once the currentUser is set
    useEffect(() => {
        if (!currentUser) return; // If there's no user, do not fetch links

        const fetchLinks = async () => {
            try {
                setLoading(true);
                const fetchedLinks = await getAllLinksForUser(currentUser);
                setLinks(fetchedLinks);
                console.log("Links fetched:", fetchedLinks);
            } catch (error) {
                setError("Error fetching links");
                console.error("Error fetching links:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks().then(r => r);
    }, [currentUser]); // Depend on currentUser only

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
                    filteredLinks.map((link) => (
                        <View key={link.id} style={styles.activityContainer}>
                            <View style={styles.activityDetails}>
                                <Text style={styles.activityTitle}>{link.name}</Text>
                                <Text style={styles.activityDate}>{link.date}</Text>
                                <Text style={styles.activityLocation}>
                                    Location: {link.location}
                                </Text>
                                <Text style={styles.activityTime}>
                                    Starts at: {link.startTime} - Ends at: {link.endTime}
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
