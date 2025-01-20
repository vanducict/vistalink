import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./NearbyCard.style";
import {useRouter} from "expo-router";
import {useEffect, useState} from "react";
import {getUserForEmail} from "../../../service/user/UserService";
import supabase from "../../../app/lib/supabase";

const NearbyCard = ({item}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageUrls, setImageUrls] = useState([]); // Initialize as an empty array
    const router = useRouter();

    const handleCardPress = (item) => {
        router.push({
            pathname: '/screens/linkDetail/[item]',
            params: {item: JSON.stringify((item))},
        });
    };
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
            } catch (error) {
                console.log("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [item]);

    useEffect(() => {
        const fetchImages = async () => {
            if (!currentUser?.uid) return; // Ensure `currentUser` is loaded
            try {
                setLoading(true);
                const files = await fetchUserImages(currentUser.uid);
                const urls = await getPublicImageUrls(files, currentUser.uid);
                setImageUrls(urls); // Set the fetched URLs
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [currentUser]);

    const fetchUserImages = async (userId) => {
        try {
            const {data, error} = await supabase.storage
                .from('profileImages') // Replace with your bucket name
                .list(userId, {
                    limit: 100, // Limit the number of files fetched
                    offset: 0,  // Offset for pagination
                });

            if (error) {
                console.error('Error fetching images:', error.message);
                return [];
            }

            return data; // Returns an array of file objects
        } catch (error) {
            console.error('Error:', error.message);
            return [];
        }
    };

    const getPublicImageUrls = async (files, userId) => {
        const urls = files.map((file) => {
            const {data} = supabase.storage
                .from('profileImages')
                .getPublicUrl(`${userId}/${file.name}`);
            return data.publicUrl; // Extract and return the public URL
        });

        return urls; // Return the array of URLs
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => handleCardPress(item)}
        >
            <TouchableOpacity style={styles.logoContainer}>
                <Image
                    source={imageUrls.length > 0 ? {uri: imageUrls[0]} : null}
                    resizeMode={"contain"}
                    style={styles.logoImage}
                />
            </TouchableOpacity>
            <Text style={styles.ownerEmail} numberOfLines={1}>
                {item.ownerEmail}
            </Text>

            <View style={styles.infoContainer}>
                <Text style={styles.linkName} numberOfLines={1}>
                    {item.name}
                </Text>
                <View style={styles.infoWrapper}>
                    <Text style={styles.location}>
                        {item.location}
                    </Text>
                </View>
            </View>
            <View>
                <Text style={styles.maxPeople}>{item.eventType}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default NearbyCard;