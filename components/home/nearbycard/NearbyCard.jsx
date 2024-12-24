import {Image, Text, TouchableOpacity, View} from "react-native";

import images from "../../../constants/images";
import styles from "./NearbyCard.style";

const NearbyCard = ({item}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => handleCardPress(item)}
        >
            <TouchableOpacity style={styles.logoContainer}>
                <Image
                    source={images.link}
                    resizeMode={"contain"}
                    style={styles.logoImage}
                />
            </TouchableOpacity>
            <Text style={styles.companyName} numberOfLines={1}>
                Sebastien Vandendriessche
            </Text>

            <View style={styles.infoContainer}>
                <Text style={styles.jobName} numberOfLines={1}>
                    Spotable Event
                </Text>
                <View style={styles.infoWrapper}>
                    <Text style={styles.publisher}>
                        Wintercircus Ghent -

                    </Text>
                    <Text style={styles.location}> Belgium</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default NearbyCard;