import {useRouter} from "expo-router";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "./Popular.style";
import PopularCard from "../popularcard/PopularCard";
import {SIZES} from "../../../constants/theme";
import React, {useEffect, useState} from "react";
import {getAllLinks} from "../../../service/link/LinkService";
import Loading from "../../common/loading/Loading";

const Popular = () => {
    const router = useRouter();
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
                <Text style={styles.headerTitle}>Popular Links</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>See all</Text>
                </TouchableOpacity>
            </View>

            <Loading loading={loading}/>

            <FlatList
                data={links}
                renderItem={({item}) => (
                    <PopularCard item={item}/>
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                contentContainerStyle={{columnGap: SIZES.small}}
                showsHorizontalScrollIndicator={false}
            />


        </View>
    );
};

export default Popular;
