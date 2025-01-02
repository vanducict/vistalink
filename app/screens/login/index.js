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
    View,
} from "react-native";
import {useRouter} from "expo-router";
import styles from "./LoginScreen.style";
import images from "../../../constants/images";
import Loading from "../../../components/common/loading/Loading";
import supabase from "../../lib/supabase";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState(''); // Changed from username to email
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const signIn = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }

        try {
            setLoading(true);
            const {data: session, error} = await supabase.auth.signInWithPassword({
                email, // Ensure the key is `email`
                password,
            });
            if (session.user) {
                router.replace("../../");
            }
            if (error) {
                console.log("Error occurred :", error);
                Alert.alert("Error", error.message);
            } else {
                console.log("Signed in session:", session);
            }
        } catch (e) {
            console.log("Error signing in: ", e);
            Alert.alert("Error", "An unexpected error occurred.");
        } finally {
            setLoading(false);
            Keyboard.dismiss();
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
                <View style={styles.container}>
                    <Image source={images.link} style={{width: 80, height: 80}}/>
                    <Text style={styles.title}>VistaLink</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email" // Updated placeholder
                        value={email}
                        onChangeText={(text) => setEmail(text)} // Updated state setter
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                    <TouchableOpacity
                        style={[styles.loginBtn, loading && styles.loginBtnDisabled]} // Apply disabled style
                        onPress={() => signIn()}
                        disabled={loading} // Disable button when loading
                    >
                        <Text style={styles.signInButton}>
                            {loading ? "Signing In..." : "Sign in"}
                        </Text>
                    </TouchableOpacity>

                    <Loading loading={loading}/>

                    <TouchableOpacity onPress={() => alert("Forgot Password?")}>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Don't have an account?</Text>

                        <TouchableOpacity onPress={() => router.replace("/screens/register")}>
                            <Text style={styles.registerLink}> Register</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
    );
};

Login.options = {
    headerShown: false, // Ensure the header is hidden
};

export default Login;
