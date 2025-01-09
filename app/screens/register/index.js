import React, {useEffect, useState} from "react";
import {
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {Stack, useRouter} from "expo-router";
import styles from "./RegisterScreen.style";
import {COLORS} from "../../../constants/theme";
import Loading from "../../../components/common/loading/Loading";
import images from "../../../constants/images";
import supabase from "../../lib/supabase";
import {getAllUserTypes, insertUser} from "../../../service/user/UserService";
import icons from "../../../constants/icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState(""); // To store the selected date
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [userType, setUserType] = useState("");
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                setLoading(true);
                const types = await getAllUserTypes();
                if (types && types.length > 0) {
                    const formattedItems = types.map((type, index) => ({
                        label: type,
                        value: type,
                        key: `${type}-${index}`,
                    }));
                    setItems(formattedItems);
                } else {
                    console.log("No types found.");
                }
            } catch (error) {
                console.log("Error fetching types:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserTypes().then((r) => r);
    }, []);

    // Handle the selected date from the DateTimePickerModal
    const handleConfirmDate = (date) => {
        const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        setBirthdate(formattedDate);
        setDatePickerVisible(false); // Hide the date picker after selection
    };

    // Sign up the user after successful registration
    const signUp = async (user) => {
        try {
            Keyboard.dismiss();
            setLoading(true);
            await insertUser(user, email.toLowerCase(), name, firstName, birthdate, description, userType);
            console.log(email + " signed up: ");
        } catch (e) {
            console.log("Error signing up: ", e);
        } finally {
            setLoading(false);
            router.replace("/"); // Navigate after registration
        }
    };

    // Handle the registration logic
    const handleRegister = async () => {
        if (!email || !password || !birthdate || !name || !firstName || !description) {
            Alert.alert("Error", "Please fill in all the fields.");
            return;
        }

        try {
            Keyboard.dismiss();
            setLoading(true);

            const {data: user, error} = await supabase.auth.signUp(
                {
                    email: email.toString().toLowerCase(),
                    password: password,
                },
                {
                    redirectTo: "https://your-custom-url.com", // Add your redirect URL here
                }
            );


            if (error) {
                throw new Error(error.message);
            }

            await signUp(user);

            Alert.alert("Success", "Confirmation email sent. Please verify your email.");
            router.replace("/"); // Redirect after registration
        } catch (error) {
            Alert.alert("Error", error.message);
            console.error("Error signing up: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
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
                        <TouchableOpacity onPress={() => router.replace("/screens/login")}>
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
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholderTextColor="#888"
                />

                {/* TouchableOpacity to open the Date Picker */}
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setDatePickerVisible(true)}
                >
                    <Text style={styles.inputText}>
                        {birthdate || "Tap to select birthdate"}
                    </Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    placeholderTextColor="#888"
                />

                <DropDownPicker
                    style={styles.roleDropdown}
                    open={open}
                    value={userType}
                    items={items}
                    setOpen={setOpen}
                    placeholder={"Select a role"}
                    setValue={setUserType}
                    setItems={setItems}
                />

                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>
                        {loading ? <Loading loading={loading}/> : "Register"}
                    </Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>

            {/* Date Picker Modal */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={() => setDatePickerVisible(false)}
            />
        </SafeAreaView>
    );
};

export default Register;
