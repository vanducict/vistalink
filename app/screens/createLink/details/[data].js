import styles from "./Details.style";
import {Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import icons from "../../../../constants/icons";
import images from "../../../../constants/images";
import React, {useEffect, useState} from "react";
import {useGlobalSearchParams, useRouter} from "expo-router";
import {COLORS} from "../../../../constants/theme";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Lottie from "lottie-react-native";
import animations from "../../../../constants/animations";
import Loading from "../../../../components/common/loading/Loading";
import {getCurrentUser} from "../../../../service/user/UserService";
import {getAllTypes} from "../../../../service/link/LinkService";

const LocationScreen = () => {
    const router = useRouter();
    const {data} = useGlobalSearchParams();
    const [location, setLocation] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date, setDate] = useState("");
    const [eventType, setEventType] = useState("");
    const [maxPeople, setMaxPeople] = useState(1);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [eventTypes, setEventTypes] = useState([]);
    const [open, setOpen] = useState(false);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const user = await getCurrentUser();
                const currentUserData = user ? user.pop() : null;

                if (currentUserData) {
                    setCurrentUser(currentUserData);
                } else {
                    console.log("No user data available.");
                }
            }
            catch (error) {
                console.log("Error fetching user:", error);
            }
            finally {
                setLoading(false);
            }
        };


        const fetchEventTypes = async () => {
            try {
                setLoading(true);
                const fetchedEventTypes = await getAllTypes();

                if (fetchedEventTypes && fetchedEventTypes.length > 0) {
                    setEventTypes(
                        fetchedEventTypes.map((type) => ({
                            label: type.value, // Extract the `value` property
                            value: type.value, // Use `value` for both `label` and `value`
                        }))
                    );
                } else {
                    console.log("No event types found.");
                }
            }
            catch (error) {
                console.log("Error fetching event types:", error);
            }
            finally {
                setLoading(false);
            }
        };


        fetchUser().then(r => {
        });
        fetchEventTypes().then(r => {
        });
    }, []);

    const validateInputs = () => {
        if (!name || !description || !location || !startTime || !endTime || !date || !eventType) {
            Alert.alert("Validation Error", "All fields are required.");
            return false;
        }
        return true;
    };

    const handleCreateEvent = async () => {
        if (!validateInputs()) {
            return;
        }
        if (!currentUser || !currentUser.email) {
            Alert.alert("Error", "User data is missing. Please try again.");
            console.error("Current User Data:", currentUser);
            return;
        }

        setLoading(true);

        try {
            await createLink(
                name,
                description,
                date,
                location,
                startTime,
                endTime,
                eventType,
                maxPeople,
                currentUser.email
            );
            setLoading(false);
            Alert.alert("Success", "Event created successfully!");
            router.back();
        }
        catch (error) {
            setLoading(false);
            console.error("Error creating event:", error);
            Alert.alert("Error", "Something went wrong while creating the event.");
        }
    };


    // Date Picker Handlers
    const handleConfirmDate = (selectedDate) => {
        setDate(selectedDate.toISOString().split("T")[0]);
        setDatePickerVisible(false);
    };

    const handleConfirmStartTime = (time) => {
        setStartTime(time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}));
        setStartTimePickerVisible(false);
    };

    const handleConfirmEndTime = (time) => {
        setEndTime(time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}));
        setEndTimePickerVisible(false);
    };


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={icons.back} resizeMode="contain" style={styles.backButtonIcon}/>
                </TouchableOpacity>
                <Image source={images.link} style={styles.headerLogo}/>
            </View>

            <KeyboardAwareScrollView
                contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid
                enableAutomaticScroll
                extraHeight={150}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Let's get started!</Text>
                    <Text style={styles.welcomeMessage}>Create and customize your perfect link.</Text>
                </View>

                <View style={styles.loaderContainer}>
                    <Lottie source={animations.talking} autoPlay loop style={{width: 200, height: 200}}/>
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter a name for your link"
                        value={maxPeople}
                        onChangeText={setMaxPeople}
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={styles.createButton} disabled={loading}>
                        {loading ? <Loading loading={loading}/> : <Text style={styles.createButtonText}>Next</Text>}
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default LocationScreen;
