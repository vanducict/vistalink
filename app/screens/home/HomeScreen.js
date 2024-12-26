import {Stack, useRouter} from "expo-router";
import ScreenHeaderBtn from "../../../components/common/header/ScreenHeaderBtn";
import Welcome from "../../../components/home/welcome/Welcome";
import Popular from "../../../components/home/popular/Popular";
import Nearby from "../../../components/home/nearby/Nearby";
import {Image, SafeAreaView, ScrollView, View} from "react-native";
import icons from "../../../constants/icons";
import {COLORS} from "../../../constants/theme";
import images from "../../../constants/images";
import React from "react";

const Home = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: true,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.profile}
                            dimension="100%"
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.menu}
                            dimension="100%"
                        />
                    ),
                    headerTitle: () => (
                        <Image
                            source={images.link} // Path to your image
                            style={{width: 40, height: 40, resizeMode: 'contain'}} // Adjust size
                        />
                    ),
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex: 1, padding: 16}}>
                    <Welcome/>
                    <Popular/>
                    <Nearby/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
