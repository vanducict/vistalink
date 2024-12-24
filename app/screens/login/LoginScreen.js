import React from "react";
import {Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Stack} from "expo-router";
import styles from "./LoginScreen.style";
import images from "../../../constants/images";

const Login = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen
                options={{
                    headerShown: false,
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
            <View style={styles.container}>
                <Image source={images.link} style={{width: 100, height: 100}}/>
                <Text style={styles.title}>VistaLink</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                />
                <TouchableOpacity
                    title="Login"
                    style={styles.loginBtn}
                    onPress={() => alert("Login")}
                >
                    Login
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert("Forgot Password?")}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => alert("Register")}>
                        <Text style={styles.registerLink}> Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};


export default Login;
