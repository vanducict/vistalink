import {useFonts} from "expo-font";
import {Stack} from "expo-router";
import AuthProvider from "../utils/AuthenticationContext";
import React from "react";

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <AuthProvider>
            <Stack
                screenOptions={{
                    headerShown: false, // Disable the Stack header globally
                }}
            />
        </AuthProvider>
    )
};

export default Layout;