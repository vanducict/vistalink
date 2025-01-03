import {FlatList, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./Welcome.style";
import icons from "../../../constants/icons";
import {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {SIZES} from "../../../constants/theme";
import {getCurrentUser} from "../../../service/user/UserService";
import Loading from "../../common/loading/Loading";
import {getAllEventTypes} from "../../../service/link/LinkService";

const Welcome = ({setActiveEventType}) => {
    const [evenTypes, setEventTypes] = useState([]);
    const router = useRouter();
    const [activeJobType, setActiveJobType] = useState(evenTypes[0]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                console.log("Fetched user:", user);
                setCurrentUser(user.pop());
            } catch (error) {
                console.log("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser().then(user => {
        });

        const fetchEvenTypes = async () => {
            try {
                const eventTypes = await getAllEventTypes();
                console.log("Fetched eventTypes:", eventTypes);
                setEventTypes(eventTypes);
            } catch (error) {
                console.log("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvenTypes().then(eventType => {
        });
    }, []);

    if (!currentUser) {
        return <Loading loading={loading}/>;
    }

    return (
        <View>
            <View>
                <Text style={styles.userName}>Hello {currentUser.firstName}.</Text>
                <Text style={styles.welcomeMessage}>Find your perfect link</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        placeholder="Search for a link"
                        placeholderTextColor="#888"
                        onChange={() => {
                        }}
                        style={styles.searchInput}
                    />
                </View>
                <TouchableOpacity>
                    <Image
                        source={icons.search}
                        resizeMode={"stretch"}
                        style={styles.searchBtnImage}
                    />
                </TouchableOpacity>
            </View>

            <View>
                <FlatList
                    data={evenTypes}
                    style={styles.tabContainer}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.tab(activeJobType, item)}
                            onPress={() => {
                                setActiveJobType(item);
                                setActiveEventType(item);
                            }}
                        >
                            <Text
                                style={styles.tabText(activeJobType, item)}
                            >{item}</Text>
                        </TouchableOpacity>
                    )}
                    horizontal={true}
                    contentContainerStyle={{columnGap: SIZES.small}}
                    keyExtractor={(item) => item}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default Welcome;
