import {FlatList, RefreshControl, Text, View} from "react-native";
import styles from "./Nearby.style";
import {SIZES} from "../../../constants/theme";
import NearbyCard from "../nearbycard/NearbyCard";
import React, {useEffect, useState} from "react";
import {getAllLinks} from "../../../service/link/LinkService";
import Loading from "../../common/loading/Loading";
import Lottie from "lottie-react-native";
import animations from "../../../constants/animations";

const Nearby = ({eventType, searchQuery, refreshing}) => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLinks = async () => {
        try {
            setLoading(true);
            console.log("Fetching links with event type:", eventType);
            const fetchedLinks = await getAllLinks(eventType, searchQuery);
            setLinks(fetchedLinks);
        } catch (error) {
            console.error("Error fetching links:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, [eventType, searchQuery, refreshing]); // Add refreshing as a dependency to trigger re-fetch

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nearby Links</Text>
            </View>

            {/* Loading indicator */}
            <Loading loading={loading}/>

            {links.length === 0 ? (
                // Render this when links array is empty
                <View style={styles.emptyContainer}>
                    <Lottie
                        source={animations.empty}
                        autoPlay
                        loop
                        style={{width: 100, height: 100}}
                    />
                    <Text style={styles.emptyText}>No links available nearby.</Text>
                </View>
            ) : (
                <FlatList
                    data={links}
                    renderItem={({item}) => <NearbyCard item={item}/>} // Render NearbyCard for each link
                    keyExtractor={(item) => item.id.toString()} // Key extraction based on id
                    horizontal={false} // Display items vertically
                    contentContainerStyle={{columnGap: SIZES.small}} // Gap between items
                    refreshControl={
                        <RefreshControl
                            refreshing={loading} // Show refresh spinner based on loading state
                            onRefresh={fetchLinks} // Trigger fetchLinks on pull-to-refresh
                        />
                    }
                />
            )}
        </View>
    );
};


export default Nearby;
