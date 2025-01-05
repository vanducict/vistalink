import {Image, KeyboardAvoidingView, SafeAreaView} from "react-native";
import {COLORS} from "../../../constants/theme";
import {Stack} from "expo-router";
import images from "../../../constants/images";
import styles from "../createLink/CreateLinkScreen.style";
import React from "react";

const Chats = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
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
                    headerTitleAlign: "center",
                }}
            />

            <KeyboardAvoidingView style={styles.container} behavior="padding">

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Chats;