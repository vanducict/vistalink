import React from "react";
import {Alert, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import styles from "./CreateLink.style";
import Lottie from "lottie-react-native";
import animations from "../../../constants/animations";

const CreateLink = () => {
    const handleCreate = () => {
        Alert.alert("Create Link", "Trigger your create link logic here!");
        // You can add your navigation or API call logic here
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