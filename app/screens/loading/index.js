import React from "react";
import {Image, SafeAreaView, View} from "react-native";
import {COLORS} from "../../../constants/theme";
import {Stack} from "expo-router";
import images from "../../../constants/images";
import styles from "./LoadingScreen.style";
import Lottie from "lottie-react-native";
import animations from "../../../constants/animations";

const Loading = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                backgroundColor={COLORS.lightWhite}
                options={{
                    headerTitle: () => (
                        <Image
                            source={images.link} // Path to your image
                            style={{width: 40, height: 40, resizeMode: 'contain'}} // Adjust size
                        />
                    ),
                    headerTitleAlign: 'center', // Ensure the title is centered
                }}
            />
            <View style={styles.loaderContainer}>
                <Lottie
                    source={animations.loading}
                    autoPlay
                    loop
                    style={{width: 50, height: 50}}
                />
            </View>
        </SafeAreaView>
    );
};


export default Loading;
