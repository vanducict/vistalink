import React from "react";
import {ActivityIndicator, Image, SafeAreaView, View} from "react-native";
import {COLORS} from "../../../constants/theme";
import {Stack} from "expo-router";
import images from "../../../constants/images";
import styles from "./LoadingScreen.style";

const Loading = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: true,
                    headerTitleAlign: "center",
                    headerTitle: () => (
                        <Image
                            source={images.link} // Path to your image
                            style={{width: 40, height: 40, resizeMode: "contain"}} // Adjust size
                        />
                    ),
                }}
            />
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.primary}/>
            </View>
        </SafeAreaView>
    );
};


export default Loading;
