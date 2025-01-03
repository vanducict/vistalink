import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Stack, useGlobalSearchParams, useRouter} from "expo-router"; // Use `useSearchParams` for query params
import {COLORS} from "../../../constants/theme";
import icons from "../../../constants/icons";
import React from "react";
import images from "../../../constants/images";

const LinkDetail = () => {
    const {item} = useGlobalSearchParams(); // Safely get query parameter
    const link = JSON.parse(item);
    const router = useRouter()
    return (
        <SafeAreaView>
            <Stack.Screen
                backgroundColor={COLORS.lightWhite}
                options={{
                    headerTitleAlign: "center",
                    headerShown: true,
                    headerTitle: () => (
                        <Image
                            source={images.link}
                            style={{width: 40, height: 40, resizeMode: "contain"}}
                        />
                    ),
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.replace("/screens/home")}>
                            <Image
                                source={icons.back}
                                resizeMode="contain"
                                style={{width: 20, height: 20}}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <View>
                {item ? (
                    <>
                        <Text>Link Detail for:</Text>
                        <Text>item: {item}</Text>
                    </>
                ) : (
                    <Text>Loading...</Text> // Display while waiting for query data
                )}
            </View>
        </SafeAreaView>
    );
};

export default LinkDetail;
