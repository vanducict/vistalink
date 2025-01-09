import React, {useEffect, useState} from "react";
import {Alert, Image, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {COLORS} from "../../../constants/theme";
import {Stack, useRouter} from "expo-router";
import images from "../../../constants/images";
import icons from "../../../constants/icons";
import Loading from "../../../components/common/loading/Loading";
import styles from "./CreateLinkScreen.style";
import {createLink, getAllTypes} from "../../../service/link/LinkService";
import DropDownPicker from "react-native-dropdown-picker";
import {getCurrentUser} from "../../../service/user/UserService";

const CreateLink = () => {
    const router = useRouter();
    // State variables for form fields
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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
            } catch (error) {
                console.log("Error fetching user:", error);
            } finally {
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
            } catch (error) {
                console.log("Error fetching event types:", error);
            } finally {
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
        if (!validateInputs()) return;
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
        } catch (error) {
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
            <Stack.Screen
                backgroundColor={COLORS.lightWhite}
                options={{
                    headerShown: true,
                    headerTitle: () => (
                        <Image
                            source={images.link}
                            style={{width: 40, height: 40, resizeMode: "contain"}}
                        />
                    ),
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image
                                source={icons.back}
                                resizeMode="contain"
                                style={{width: 20, height: 20}}
                            />
                        </TouchableOpacity>
                    ),
                    headerTitleAlign: "center",
                }}
            />

            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    value={location}
                    onChangeText={setLocation}
                    placeholderTextColor="#888"
                />
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
                    style={styles.roleDropdown}
                    open={open}
                    value={eventType}
                    items={eventTypes}
                    setOpen={setOpen}
                    placeholder={"Select an event type"}
                    setValue={setEventType}
                    setItems={setEventTypes}
                />

                <View style={styles.counterContainer}>
                    <Text style={styles.counterLabel}>Max People:</Text>
                    <View style={styles.counterControls}>
                        <TouchableOpacity
                            style={[styles.counterButton, styles.decreaseButton]}
                            onPress={() => setMaxPeople(Math.max(1, maxPeople - 1))}
                        >
                            <Text style={styles.counterButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.counterValue}>{maxPeople}</Text>
                        <TouchableOpacity
                            style={[styles.counterButton, styles.increaseButton]}
                            onPress={() => setMaxPeople(maxPeople + 1)}
                        >
                            <Text style={styles.counterButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.createButton}
                    onPress={handleCreateEvent}
                    disabled={loading || !currentUser}
                >
                    <Text style={styles.createButtonText}>
                        {loading ? <Loading loading={loading}/> : "Create"}
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

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

export default CreateLink;
