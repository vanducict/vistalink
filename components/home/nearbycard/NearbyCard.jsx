import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./NearbyCard.style";
import {useRouter} from "expo-router";
import {useEffect, useState} from "react";
import {getUserForEmail} from "../../../service/user/UserService";
import supabase from "../../../app/lib/supabase";

const NearbyCard = ({item}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userImageUrls, setUserImageUrls] = useState([]); // Store profile image URLs
    const [linkImageUrls, setLinkImageUrls] = useState([]); // Store link image URLs
    const router = useRouter();

    const handleCardPress = (item) => {
        router.push({
            pathname: "/screens/linkDetail/[item]",
            params: {item: JSON.stringify(item)},
        });
    };

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const user = await getUserForEmail(item?.ownerEmail);
                if (user && user.length > 0) {
                    setCurrentUser(user[0]);
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

        fetchUser();
    }, [item]);

    // Fetch images for the user and link
    useEffect(() => {
        const fetchImages = async () => {
            if (!currentUser?.uid) {
                return;
            } // Ensure `currentUser` is loaded

            try {
                setLoading(true);

                // Fetch user profile images
                const userFiles = await fetchUserImages(currentUser.uid);
                const userUrls = await getPublicUserImageUrls(userFiles, currentUser.uid);
                setUserImageUrls(userUrls); // Set the fetched profile image URLs

                // Fetch link images
                const linkFiles = await fetchLinkImages(item?.id);
                const linkUrls = await getPublicLinkImageUrls(linkFiles, item?.id);
                setLinkImageUrls(linkUrls); // Set the fetched link image URLs
            }
            catch (error) {
                console.error("Error fetching images:", error);
            }
            finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            fetchImages();
        }
    }, [currentUser, item?.id]);

    const fetchUserImages = async (userId) => {
        try {
            const {data, error} = await supabase.storage
                .from("profileImages") // Fetch from profile images bucket
                .list(userId, {
                    limit: 100, // Limit the number of files fetched
                    offset: 0, // Offset for pagination
                });

            if (error) {
                console.error("Error fetching profile images:", error.message);
                return [];
            }

            return data; // Return array of profile image file objects
        }
        catch (error) {
            console.error("Error:", error.message);
            return [];
        }
    };

    const getPublicUserImageUrls = (files, userId) => {
        return files.map((file) => {
            const {data} = supabase.storage
                .from("profileImages")
                .getPublicUrl(`${userId}/${file.name}`);
            return data.publicUrl; // Extract and return the public URL
        });
    };

    const fetchLinkImages = async (eventId) => {
        try {
            const {data, error} = await supabase.storage
                .from("linkImages") // Fetch from link images bucket
                .list(`${eventId}/`, {
                    limit: 1, // Get only the first image
                    offset: 0,
                });

            if (error) {
                console.error("Error fetching link images:", error.message);
                return [];
            }

            return data || []; // Return file data or empty array
        }
        catch (error) {
            console.error("Error:", error.message);
            return [];
        }
    };

    const getPublicLinkImageUrls = (files, id) => {
        return files.map((file) => {
            const {data} = supabase.storage
                .from("linkImages")
                .getPublicUrl(`${id}/${file.name}`);
            return data.publicUrl;
        });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={() => handleCardPress(item)}>
            {/* User profile image */}
            <TouchableOpacity style={styles.logoContainer}>
                {userImageUrls.length > 0 ? (
                    <Image
                        source={{uri: userImageUrls[0]}}
                        resizeMode="cover"
                        style={styles.logoImage}
                    />
                ) : (
                    <Text>No profile image available</Text> // Fallback message if no profile image
                )}
            </TouchableOpacity>

            <Text style={styles.ownerEmail} numberOfLines={1}>
                {item.ownerEmail}
            </Text>

            <View style={styles.infoContainer}>
                <Text style={styles.linkName} numberOfLines={1}>
                    {item.name}
                </Text>
                <View style={styles.infoWrapper}>
                    <Text style={styles.location}>{item.location}</Text>
                </View>
            </View>

            <View>
                <Text style={styles.maxPeople}>{item.eventType}</Text>
            </View>

            {/* Link images */}
            <View style={styles.linkImagesContainer}>
                {linkImageUrls.length > 0 ? (
                    <Image
                        key={0}
                        source={{uri: linkImageUrls[0]}}
                        style={styles.linkImage} // Show only the first image
                    />
                ) : (
                    <Text>No link images available</Text> // Fallback message if no link images
                )}
            </View>

        </TouchableOpacity>
    );
};

export default NearbyCard;
