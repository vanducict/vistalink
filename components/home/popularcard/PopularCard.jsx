import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./PopularCard.style";
import images from "../../../constants/icons";

const PopularJobCard = ({item}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => handleCardPress(item)}
        >
            <TouchableOpacity style={styles.logoContainer}>
                <Image
                    source={images.provider}
                    resizeMode={"contain"}
                    style={styles.logoImage}
                />
            </TouchableOpacity>
            <Text style={styles.ownerEmail} numberOfLines={1}>
                {item.ownerEmail}
            </Text>

            <View style={styles.infoContainer}>
                <Text style={styles.linkName} numberOfLines={1}>
                    {item.name}
                </Text>
                <View style={styles.infoWrapper}>
                    <Text style={styles.location}>
                        {item.location} -
                    </Text>
                </View>
            </View>
            <View>
                <Text>Open spots :
                    <Text style={styles.maxPeople}> {item.maxPeople}</Text>
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default PopularJobCard;