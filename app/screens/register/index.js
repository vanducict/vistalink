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
import DropDownPicker from 'react-native-dropdown-picker';
import {Stack, useRouter} from "expo-router";
import styles from "./RegisterScreen.style";
import {COLORS} from "../../../constants/theme";
import Loading from "../../../components/common/loading/Loading";
import images from "../../../constants/images";
import supabase from "../../lib/supabase";
import {getAllUserTypes, insertUser} from "../../../service/user/UserService";
import icons from "../../../constants/icons";


const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [userType, setUserType] = useState("");
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                setLoading(true);
                const types = await getAllUserTypes();
                if (types && types.length > 0) {
                    // Make sure each item has a unique key
                    const formattedItems = types.map((type, index) => ({
                        label: type,  // Assuming 'type' is the user type value
                        value: type,  // 'value' will be used by DropDownPicker
                        key: `${type}-${index}`  // A unique key for each item
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
        fetchUserTypes().then(r => r);
    }, []);


    // Sign up the user after successful registration
    const signUp = async (user) => {
        try {
            Keyboard.dismiss();
            setLoading(true);
            await insertUser(user, email, name, firstName, birthdate, description, userType);
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

            // Sign up the user with Supabase
            const {data: user, error} = await supabase.auth.signUp({
                email,
                password,
            }, {
                redirectTo: "https://your-custom-url.com", // Add your redirect URL here
            });

            if (error) {
                throw new Error(error.message);  // Ensure we throw an error if signup fails
            }

            // If the user was created, sign them up
            await signUp(user);

            // Success message
            Alert.alert("Success", "You have successfully registered!");
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

                <TextInput
                    style={styles.input}
                    placeholder="Birthdate (YYYY-MM-DD)"
                    value={birthdate}
                    onChangeText={setBirthdate}
                    placeholderTextColor="#888"
                />

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
                        {loading ? "..." : "Register"}
                    </Text>
                </TouchableOpacity>
                <Loading loading={loading}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Register;
