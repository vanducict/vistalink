import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useGlobalSearchParams, useRouter} from "expo-router";
import {COLORS} from "../../../constants/theme";
import icons from "../../../constants/icons";
import React, {useEffect, useState} from "react";
import styles from "./[item].style";
import images from "../../../constants/images";
import {createUserLink, getUserLinksForId} from "../../../service/userLink/UserLinkService";
import {getCurrentUser} from "../../../service/user/UserService";
import supabase from "../../lib/supabase";
import Swiper from "react-native-swiper";

const LinkDetail = () => {
    const {item} = useGlobalSearchParams();
    const event = item ? JSON.parse(item) : null;
    const router = useRouter();
    const [imageUrls, setImageUrls] = useState([]);
    const [spotsTaken, setSpotsTaken] = useState(0);
    const totalSpots = event ? event.maxPeople : 1;
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userLinks, setUserLinks] = useState([]);
    const [key, setKey] = useState(0);

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
        }
        catch (error) {
            console.log("Error fetching user:", error);
        }
        finally {
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
        }
        catch (error) {
            console.log("Error fetching user links:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const fetchImages = async () => {
        if (!event?.id) {
            return;
        }

        try {
            setLoading(true);

            // Get files inside event folder
            const files = await fetchLinkImages(event?.id);

            // Generate public URLs
            const urls = getPublicImageUrls(files, event?.id);

            setImageUrls(urls); // Update state with image URLs
        }
        catch (error) {
            console.error("Error fetching images:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const fetchLinkImages = async (eventId) => {
        try {
            const {data, error} = await supabase.storage
                .from("linkImages")
                .list(eventId + "/", {
                    limit: 10,  // Get up to 10 images
                    offset: 0,
                });

            if (error) {
                console.error("Error fetching images:", error.message);
                return [];
            }

            return data || []; // Return file data or empty array
        }
        catch (error) {
            console.error("Error:", error.message);
            return [];
        }
    };

    const getPublicImageUrls = (files, eventId) => {
        return files.map(file => {
            return supabase.storage
                .from("linkImages")
                .getPublicUrl(`${eventId}/${file.name}`).data.publicUrl;
        });
    };


    useEffect(() => {
        fetchUser();
        if (event?.id) {
            fetchUserLinksForId();
            fetchImages();
        }
    }, [event?.id]);


    async function registerToLink() {
        if (!currentUser || loading) {
            return;
        }

        try {
            setLoading(true);
            await createUserLink(event.id, currentUser.email); // Register the user

            // Refetch user links after registration
            await fetchUserLinksForId();
        }
        catch (error) {
            console.error("Error registering to link:", error);
        }
        finally {
            setLoading(false);
        }
    }

    const isUserRegistered = userLinks.some(link => link.userEmail === currentUser?.email);
    useEffect(() => {
        // Force remounting Swiper component on component reload
        setKey(prevKey => prevKey + 1);
    }, [imageUrls]); // Trigger remount when imageUrls change or component reloads

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={icons.back} resizeMode="contain" style={styles.backButtonIcon}/>
                </TouchableOpacity>
                <Image source={images.link} style={styles.headerLogo}/>
            </View>

            <ScrollView>
                <View style={styles.container}>
                    {event ? (
                        <>
                            <Text style={styles.title}>{event.name}</Text>
                            <Swiper
                                key={key} // Key will force the component to remount each time
                                style={styles.swiper}
                                showsPagination={true}
                                loop={false}
                                autoplay={false}
                                activeDotColor={COLORS.tertiary}
                                dotColor="lightgray"  // Inactive dot color
                                paginationStyle={styles.paginationStyle}
                                dotStyle={styles.dot}
                                activeDotStyle={styles.activeDot}
                            >
                                {imageUrls.map((url, index) => (
                                    <View key={index} style={styles.imageContainer}>
                                        <Image source={{uri: url}} style={styles.avatar}/>
                                    </View>
                                ))}
                            </Swiper>
                            <Text style={styles.detail}>{event.description}</Text>
                            <Text style={styles.detail}>Location: {event.location}</Text>
                            <Text style={styles.detail}>Date: {event.date}</Text>
                            <Text style={styles.detail}>
                                Time: {event.startTime} - {event.endTime}
                            </Text>
                            <Text style={styles.detail}>Type: {event.eventType}</Text>
                            <Text style={styles.detail}>
                                Searching for: {totalSpots > 1 ? `${totalSpots} persons` : `${totalSpots} person`}
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
                        (isUserRegistered) && {backgroundColor: COLORS.gray} // Turn gray if full or registered
                    ]}
                    onPress={registerToLink}
                    disabled={isUserRegistered || loading} // Disable if full, registered, or loading
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
