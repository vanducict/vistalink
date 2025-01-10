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

const Popular = ({eventType, searchQuery, refreshing}) => {
    const router = useRouter();
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLinks = async () => {
        try {
            setLoading(true);
            const fetchedLinks = await getAllLinks(eventType, searchQuery);
            setLinks(fetchedLinks);
        } catch (error) {
            console.error("Error fetching links:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch links initially and whenever eventType, searchQuery, or refreshing changes
    useEffect(() => {
        fetchLinks();
    }, [eventType, searchQuery, refreshing]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular Links</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>See all</Text>
                </TouchableOpacity>
            </View>

            <Loading loading={loading}/>

            {links.length === 0 ? (
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
                        <PopularCard item={item}/>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    contentContainerStyle={{columnGap: SIZES.small}}
                    showsHorizontalScrollIndicator={false}
                />
            )}
        </View>
    );
};


export default Popular;
