import React, {useState} from "react";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useRouter} from "expo-router";
import styles from "./LoginScreen.style";
import images from "../../../constants/images";
import {signInWithEmailAndPassword} from "firebase/auth";
import {firebase_auth} from "../../../FirebaseConfig";
import Loading from "../../../components/common/loading/Loading";
import {waitFor} from "@babel/core/lib/gensync-utils/async";


const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;

    const signIn = async () => {
        try {
            setLoading(true);
            waitFor(2000);
            const response = await signInWithEmailAndPassword(auth, username, password);
            console.log(username + " signed in: ", username);
        } catch (e) {
            console.log("Error signing in: ", e);
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
                        placeholder="Username"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        placeholderTextColor="#888"
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
                        style={styles.loginBtn}
                        onPress={() => signIn()}
                    >
                        <Text style={styles.signInButton}>Sign in</Text>
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