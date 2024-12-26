import {useRouter} from "expo-router";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "./Popular.style";
import PopularCard from "../popularcard/PopularCard";
import {SIZES} from "../../../constants/theme";

const Popular = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular Links</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>See all</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={[1, 2, 3, 4, 5]}  // Use actual data here instead of static values
                renderItem={({item}) => <PopularCard item={item}/>}
                keyExtractor={(item) => item.toString()}
                horizontal={true}
                contentContainerStyle={{columnGap: SIZES.small}}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default Popular;
