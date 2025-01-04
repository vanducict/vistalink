import React from "react";
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import styles from "./CreateLink.style";
import Lottie from "lottie-react-native";
import animations from "../../../constants/animations";
import {useRouter} from "expo-router";

const CreateLink = () => {
    const router = useRouter();
    const handleCreate = () => {
        router.push({
            pathname: '/screens/createLink/'
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Lottie
                    source={animations.connect}
                    autoPlay
                    loop
                    style={{width: 200, height: 200}}
                />
                <Text style={styles.header}>
                    Tap the button below to create a link event and find the connections you're looking for!
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleCreate}>
                    <Text style={styles.buttonText}>Create Link</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CreateLink;
