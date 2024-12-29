import {Stack, useRouter} from "expo-router";
import ScreenHeaderBtn from "../../../components/common/header/ScreenHeaderBtn";
import Welcome from "../../../components/home/welcome/Welcome";
import Popular from "../../../components/home/popular/Popular";
import Nearby from "../../../components/home/nearby/Nearby";
import {FlatList, Image, SafeAreaView} from "react-native";
import icons from "../../../constants/icons";
import {COLORS} from "../../../constants/theme";
import images from "../../../constants/images";
import React from "react";

const Home = () => {
    const router = useRouter();

    // Data for FlatList (could be sections or a list of items)
    const sections = [
        {id: '1', component: <Welcome/>},
        {id: '2', component: <Popular/>},
        {id: '3', component: <Nearby/>},
    ];

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                backgroundColor={COLORS.lightWhite}
                options={{
                    headerTitle: () => (
                        <Image
                            source={images.link} // Path to your image
                            style={{width: 40, height: 40, resizeMode: 'contain'}} // Adjust size
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.menu}
                            dimension="100%"
                        />
                    ),
                    headerTitleAlign: 'center', // Ensure the title is centered
                }}
            />

            <FlatList
                data={sections}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => item.component}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{padding: 16}}
            />
        </SafeAreaView>
    );
};

export default Home;
