import React, {useState} from "react";
import {Image, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Stack} from "expo-router";
import styles from "./LoginScreen.style";
import images from "../../../constants/images";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {firebase_auth} from "../../../FirebaseConfig";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;
    const signIn = async () => {
        try {
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
                    headerShown: false,
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
            <KeyboardAvoidingView behavior={"padding"}>
                <View style={styles.container}>
                    <Image source={images.link} style={{width: 100, height: 100}}/>
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


export default Login;
