import React, {useState} from "react";
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {Stack} from "expo-router";
import styles from "./LoginScreen.style";
import images from "../../../constants/images";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {firebase_auth} from "../../../FirebaseConfig";
import {waitFor} from "@babel/core/lib/gensync-utils/async";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;
    const signIn = async () => {
        try {
            setLoading(true);
            waitFor(2000);
            const response = await signInWithEmailAndPassword(auth, username, password);
            console.log(username + " signed in: ", response);
        } catch (e) {
            console.log("Error signing in: ", e);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        try {
            setLoading(true);
            waitFor(2000);
            const response = await createUserWithEmailAndPassword(auth, username, password);
            console.log(username + " signed up: ", response);
        } catch (e) {
            console.log("Error signing up: ", e);
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen
                options={{
                    headerShadowVisible: true,
                    headerTitle: () => (
                        <Image
                            source={images.link} // Path to your image
                            style={{width: 40, height: 40, resizeMode: 'contain'}} // Adjust size
                        />
                    ),
                    headerTitleAlign: 'center', // Ensure the title is centered
                }}
            />

            <KeyboardAvoidingView behavior={"padding"}>
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
                        <Text>Login</Text>
                    </TouchableOpacity>


                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator}/>
                    ) : null}

                    <TouchableOpacity onPress={() => alert("Forgot Password?")}>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={signUp}>
                            <Text style={styles.registerLink}> Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
    );


};

Login.options = {
    headerShown: false, // Ensure the header is shown for Home
};

export default Login;
