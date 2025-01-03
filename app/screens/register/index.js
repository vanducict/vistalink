import React, {useState} from "react";
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
import {Stack, useRouter} from "expo-router";

import styles from "./RegisterScreen.style";
import {COLORS} from "../../../constants/theme";
import Loading from "../../../components/common/loading/Loading";
import images from "../../../constants/images";
import supabase from "../../lib/supabase";
import {insertUser} from "../../../service/user/UserService";
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

    // Sign up the user after successful registration
    const signUp = async (user) => {
        try {
            Keyboard.dismiss();
            setLoading(true);
            await insertUser(user, email, name, firstName, birthdate, description);
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

                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>
                        {loading ? "Registering..." : "Register"}
                    </Text>
                </TouchableOpacity>
                <Loading loading={loading}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Register;
