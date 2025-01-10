import {FlatList, Image, Keyboard, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./SearchBar.style";
import icons from "../../../constants/icons";
import {useEffect, useState} from "react";
import {SIZES} from "../../../constants/theme";
import Loading from "../../common/loading/Loading";
import {getAllEventTypes} from "../../../service/link/LinkService";

const Welcome = ({setActiveEventType, setActiveSearchQuery, refreshing, onRefresh}) => {
    const [eventTypes, setEventTypes] = useState([]);
    const [activeJobType, setActiveJobType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchEventTypes = async () => {
            try {
                setLoading(true);
                const eventTypes = await getAllEventTypes();
                setEventTypes(eventTypes);
            } catch (error) {
                console.log("Error fetching event types:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventTypes();
    }, [refreshing]); // Re-fetch event types when refreshing changes

    const handleTabPress = (item) => {
        if (activeJobType === item) {
            setActiveJobType(null);
            setActiveEventType(null);
        } else {
            setActiveJobType(item);
            setActiveEventType(item);
        }
    };

    const handleSearchPress = () => {
        setActiveSearchQuery(searchQuery);
        Keyboard.dismiss();
    };

    if (loading) {
        return <Loading loading={loading}/>;
    }

    return (
        <View>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        placeholder="Search for a link"
                        placeholderTextColor="#888"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
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
                            onPress={() => handleTabPress(item)}
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
