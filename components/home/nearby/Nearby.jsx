import {FlatList, Text, View} from "react-native";
import styles from "./Nearby.style";
import {SIZES} from "../../../constants/theme";
import NearbyCard from "../nearbycard/NearbyCard";
import React, {useEffect, useState} from "react";
import {getAllLinks} from "../../../service/link/LinkService";
import Loading from "../../common/loading/Loading";

const Nearby = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                setLoading(true);
                const fetchedLinks = await getAllLinks();
                setLinks(fetchedLinks);
            } catch (error) {
                console.error("Error fetching links:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks().then(links => {
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nearby Links</Text>
            </View>

            <Loading loading={loading}/>

            <FlatList
                data={links}
                renderItem={({item}) => <NearbyCard item={item}/>}
                keyExtractor={(item) => item.id.toString()}
                horizontal={false}
                contentContainerStyle={{columnGap: SIZES.small}}
            />
        </View>
    );
};

export default Nearby;
