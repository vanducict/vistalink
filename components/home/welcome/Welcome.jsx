import {FlatList, Image, Keyboard, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./Welcome.style";
import icons from "../../../constants/icons";
import {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {SIZES} from "../../../constants/theme";
import {getCurrentUser} from "../../../service/user/UserService";
import Loading from "../../common/loading/Loading";
import {getAllEventTypes} from "../../../service/link/LinkService";

const Welcome = ({setActiveEventType, setActiveSearchQuery}) => {
    const [eventTypes, setEventTypes] = useState([]);
    const router = useRouter();
    const [activeJobType, setActiveJobType] = useState(null);  // Initially no filter
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');  // Track the search input

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user.pop());
            } catch (error) {
                console.log("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();

        const fetchEventTypes = async () => {
            try {
                const eventTypes = await getAllEventTypes();
                setEventTypes(eventTypes);
            } catch (error) {
                console.log("Error fetching event types:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventTypes();
    }, []);

    if (!currentUser) {
        return <Loading loading={loading}/>;
    }

    const handleTabPress = (item) => {
        if (activeJobType === item) {
            setActiveJobType(null);
            setActiveEventType(null);
        } else {
            setActiveJobType(item);
            setActiveEventType(item);
        }
    };

    // Update the search query when the search button is pressed
    const handleSearchPress = () => {
        setActiveSearchQuery(searchQuery);
        Keyboard.dismiss()
    };

    return (
        <View>
            <View>
                <Text style={styles.userName}>Hello {currentUser.firstName}.</Text>
                <Text style={styles.welcomeMessage}>Find your perfect link</Text>
            </View>

            {/* Search bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        placeholder="Search for a link"
                        placeholderTextColor="#888"
                        value={searchQuery} // Bind the value to the searchQuery state
                        onChangeText={setSearchQuery} // Update the searchQuery state
                        style={styles.searchInput}
                    />
                </View>
                <TouchableOpacity onPress={handleSearchPress}>
                    <Image
                        source={icons.search}
                        resizeMode={"stretch"}
                        style={styles.searchBtnImage}
                    />
                </TouchableOpacity>
            </View>

            <View>
                <FlatList
                    data={eventTypes}
                    style={styles.tabContainer}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.tab(activeJobType, item)}
                            onPress={() => handleTabPress(item)} // Handle the tab press
                        >
                            <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
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
