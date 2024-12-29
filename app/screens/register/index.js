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
import {createUserWithEmailAndPassword} from "firebase/auth";
import styles from "./RegisterScreen.style";
import images from "../../../constants/images";
import {COLORS} from "../../../constants/theme";
import {waitFor} from "@babel/core/lib/gensync-utils/async";
import insertUser from "../../../service/user/UserService";
import {firebase_auth} from "../../../FirebaseConfig";
import Loading from "../../../components/common/loading/Loading";

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;
    const handleRegister = async () => {

        const signUp = async () => {
            try {
                Keyboard.dismiss();
                setLoading(true);
                waitFor(2000);
                const firebaseResponse = await createUserWithEmailAndPassword(auth, email, password);
                if (firebaseResponse.user != null) {
                    await insertUser(firebaseResponse.user, email, name, firstName, birthdate);
                }
                console.log(email + " signed up: ");
            } catch (e) {
                console.log("Error signing up: ", e);
            } finally {
                setLoading(false);
                router.replace("/");
            }
        };

        if (!email || !password || !birthdate || !name || !firstName) {
            Alert.alert("Error", "Please fill in all the fields.");
            return;
        }

        try {
            await signUp();
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen
                backgroundColor={COLORS.lightWhite}
                options={{
                    headerTitle: () => (
                        <Image
                            source={images.link} // Path to your image
                            style={{width: 40, height: 40, resizeMode: 'contain'}} // Adjust size
                        />
                    ),
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.replace("/screens/login")}>
                            <Text style={styles.backButton}>Back</Text>
                        </TouchableOpacity>
                    ),
                    headerTitleAlign: 'center', // Ensure the title is centered
                }}
            />

            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    id="email"
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    id="password"
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    placeholderTextColor="#888"
                />


                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    id="name"
                    onChangeText={(text) => setName(text)}
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    id="firstname"
                    onChangeText={(text) => setFirstName(text)}
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Birthdate (YYYY-MM-DD)"
                    value={birthdate}
                    id="birthdate"
                    onChangeText={(text) => setBirthdate(text)}
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
