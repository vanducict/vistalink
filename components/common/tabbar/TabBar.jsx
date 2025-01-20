import React, {useEffect, useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./TabBar.style";
import icons from "../../../constants/icons"; // Import your default icons
import supabase from "../../../app/lib/supabase";
import {getCurrentUser} from "../../../service/user/UserService";

const TabBar = ({state, descriptors, navigation}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageUrls, setImageUrls] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const user = await getCurrentUser();
                if (user && user.length > 0) {
                    setCurrentUser(user.pop());
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
    }, []);

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
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                // Dynamically choose the icon based on the route name
                let iconSource;
                let iconName;
                let iconStyle = styles.tabIcon; // Default icon style
                switch (route.name) {
                    case "Home":
                        iconSource = icons.home;
                        iconName = "Home";
                        break;
                    case "MyProfile":
                        iconSource = imageUrls.length > 0 ? {uri: imageUrls[0]} : null; // Use the profile image or default icon
                        iconName = "Profile";
                        iconStyle = [
                            {
                                ...styles.tabIconProfile,
                            }
                        ];
                        break;
                    case "Chats":
                        iconSource = icons.chats;
                        iconName = "Chats";
                        break;
                    case "MyLinks":
                        iconSource = icons.links;
                        iconName = "My Links";
                        break;
                    default:
                        iconSource = null;
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabItem}
                    >
                        <Image
                            source={iconSource} // Use the selected icon source
                            resizeMode={"contain"}
                            style={iconStyle} // Apply dynamic style based on focus
                        />
                        <Text style={[styles.tabText, isFocused && styles.focusedText]}>
                            {iconName}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default TabBar;
