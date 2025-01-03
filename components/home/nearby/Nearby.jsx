import {FlatList, Text, View} from "react-native";
import styles from "./Nearby.style";
import {SIZES} from "../../../constants/theme";
import NearbyCard from "../nearbycard/NearbyCard";
import React, {useEffect, useState} from "react";
import {getAllLinks} from "../../../service/link/LinkService";
import Loading from "../../common/loading/Loading";

const Nearby = ({eventType}) => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                setLoading(true);
                console.log("Fetching links with event type:", eventType);  // Logs current eventType
                const fetchedLinks = await getAllLinks(eventType);  // Make sure the eventType is used in the API call or logic
                setLinks(fetchedLinks);
            } catch (error) {
                console.error("Error fetching links:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks().then(eventType); // Fetch links whenever eventType changes

    }, [eventType]);  // Dependency on eventType ensures effect runs every time it changes

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nearby Links</Text>
            </View>

            {/* Loading indicator */}
            <Loading loading={loading}/>

            <FlatList
                data={links}
                renderItem={({item}) => <NearbyCard item={item}/>} // Render NearbyCard for each link
                keyExtractor={(item) => item.id.toString()} // Key extraction based on id
                horizontal={false} // Display items vertically
                contentContainerStyle={{columnGap: SIZES.small}} // Gap between items
            />
        </View>
    );
};

export default Nearby;
