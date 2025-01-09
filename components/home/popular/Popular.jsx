import {useRouter} from "expo-router";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "./Popular.style";
import PopularCard from "../popularcard/PopularCard";
import {SIZES} from "../../../constants/theme";
import React, {useEffect, useState} from "react";
import {getAllLinks} from "../../../service/link/LinkService";
import Loading from "../../common/loading/Loading";
import Lottie from "lottie-react-native";
import animations from "../../../constants/animations";

const Popular = ({eventType, searchQuery}) => {
    const router = useRouter();
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    // Triggered whenever eventType changes
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                setLoading(true);
                console.log("Fetching links with event type:", eventType);  // Logs current eventType
                const fetchedLinks = await getAllLinks(eventType, searchQuery);  // Make sure the eventType is used in the API call or logic
                setLinks(fetchedLinks);
            } catch (error) {
                console.error("Error fetching links:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks().then(r => eventType); // Fetch links whenever eventType changes
        console.log(searchQuery);
    }, [eventType, searchQuery]);  // Dependency on eventType ensures effect runs every time it changes

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular Links</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>See all</Text>
                </TouchableOpacity>
            </View>

            {/* Loading indicator */}
            <Loading loading={loading}/>

            {links.length === 0 ? (
                // Render this when the links array is empty
                <View style={styles.emptyContainer}>
                    <Lottie
                        source={animations.empty}
                        autoPlay
                        loop
                        style={{width: 100, height: 100}}
                    />
                    <Text style={styles.emptyText}>No popular links available.</Text>
                </View>
            ) : (
                <FlatList
                    data={links}
                    renderItem={({item}) => (
                        <PopularCard item={item}/> // Render each PopularCard item
                    )}
                    keyExtractor={(item) => item.id.toString()} // Extract unique key for each item
                    horizontal={true} // Display items horizontally
                    contentContainerStyle={{columnGap: SIZES.small}} // Adjust spacing between items
                    showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
                />
            )}
        </View>

    );
};

export default Popular;
