import styles from "./Details.style";
import {Alert, Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import icons from "../../../../constants/icons";
import images from "../../../../constants/images";
import React, {useEffect, useState} from "react";
import {useGlobalSearchParams, useRouter} from "expo-router";
import {COLORS} from "../../../../constants/theme";
import Lottie from "lottie-react-native";
import animations from "../../../../constants/animations";
import Loading from "../../../../components/common/loading/Loading";
import {getCurrentUser} from "../../../../service/user/UserService";
import {getAllTypes} from "../../../../service/link/LinkService";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DetailsScreen = () => {
    const router = useRouter();
    const {data} = useGlobalSearchParams();
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date, setDate] = useState("");
    const [eventType, setEventType] = useState("");
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


    let handleKeyPress = () => {
        if (!startTime || !endTime || !date || !eventType) {
            Alert.alert('Error', 'Please fill in all fields and select at least one interest.');
            return;
        }

        // Parse the incoming data
        let parsedData = {};
        try {
            parsedData = data ? JSON.parse(data) : {};
        }
        catch (error) {
            console.error('Error parsing data:', error);
        }

        // Add new fields to the data object
        const updatedData = {
            ...parsedData, // Preserve existing data
            starTime: startTime,
            endTime: endTime,
            date: date,
            eventType: eventType,
        };

        console.log("Updated Data:", updatedData);

        // Navigate to the next screen with the updated data
        router.push({
            pathname: '/screens/createLink/persons/[data]',
            params: {data: JSON.stringify(updatedData)},
        });
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

            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>You're Almost There!</Text>
                <Text style={styles.welcomeMessage}>Just let us know the date, time, and event type.</Text>
            </View>

            <View style={styles.loaderContainer}>
                <Lottie source={animations.calendar} autoPlay loop style={{width: 300, height: 200}}/>
            </View>

            <View style={styles.container}>
                <TouchableOpacity style={styles.input} onPress={() => setDatePickerVisible(true)}>
                    <Text style={{color: date ? "#000" : "#888"}}>
                        {date || "Select Date"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.input} onPress={() => setStartTimePickerVisible(true)}>
                    <Text style={{color: startTime ? "#000" : "#888"}}>
                        {startTime || "Select Start Time"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.input} onPress={() => setEndTimePickerVisible(true)}>
                    <Text style={{color: endTime ? "#000" : "#888"}}>
                        {endTime || "Select End Time"}
                    </Text>
                </TouchableOpacity>

                <DropDownPicker
                    open={open}
                    value={eventType}
                    items={eventTypes}
                    setOpen={setOpen}
                    placeholder={"Select an event type"}
                    setValue={setEventType}
                    setItems={setEventTypes}
                />
                <TouchableOpacity style={styles.createButton} disabled={loading} onPress={() => handleKeyPress()}>
                    {loading ? <Loading loading={loading}/> : <Text style={styles.createButtonText}>Next</Text>}
                </TouchableOpacity>
            </View>

            {/* Date Picker */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={() => setDatePickerVisible(false)}
            />

            {/* Start Time Picker */}
            <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmStartTime}
                onCancel={() => setStartTimePickerVisible(false)}
            />

            {/* End Time Picker */}
            <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmEndTime}
                onCancel={() => setEndTimePickerVisible(false)}
            />
        </SafeAreaView>
    );
};

export default DetailsScreen;
