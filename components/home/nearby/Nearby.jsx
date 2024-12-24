import {useRouter} from "expo-router";
import {FlatList, Text, View} from "react-native";
import styles from "./Nearby.style";
import {SIZES} from "../../../constants/theme";
import NearbyCard from "../nearbycard/NearbyCard";


const Nearby = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nearby Links</Text>
            </View>

            <View>
                <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    renderItem={({item}) => {
                        return <NearbyCard item={item}/>
                    }}
                    keyExtractor={(item) => item.toString()}
                    horizontal={false}
                    contentContainerStyle={{columnGap: SIZES.small}}
                />
            </View>


        </View>
    );
}


export default Nearby;