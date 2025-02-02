import {Alert, Image, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';

import icons from "../../../../constants/icons";
import images from "../../../../constants/images";
import {useGlobalSearchParams, useRouter} from "expo-router";
import styles from "./[data].style.js";
import Lottie from "lottie-react-native";
import animations from "../../../../constants/animations";

const AdditionalInfo3 = () => {
    const router = useRouter();
    const {data} = useGlobalSearchParams(); // Extract channelId from route params
    const [passion, setPassion] = useState('');
    const [travel, setTravel] = useState('');
    const [funFact, setFunFact] = useState('');


    const handleSubmit = () => {
        if (!passion || !travel || !funFact) {
            Alert.alert('Error', 'Please answer all questions.');
            return;
        }

        // Parse the incoming data
        let parsedData = {};
        try {
            parsedData = data ? JSON.parse(data) : {};
        }
        catch (error) {
            console.error('Error parsing data:', error);
        }

        // Add new fields to the data object
        const updatedData = {
            ...parsedData, // Preserve existing data
            question1: passion,
            question2: travel,
            question3: funFact,
        };

        console.log("Updated Data:", updatedData);

        // Navigate to the next screen with the updated data
        router.push({
            pathname: '/screens/register/additionalInfo4/[data]',
            params: {data: JSON.stringify(updatedData)},
        });
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={[styles.scrollViewContent, {flex: 1}]} behavior="padding">
                <View style={styles.customHeader}>
                    <TouchableOpacity onPress={() => router.replace("/screens/register")}>
                        <Image source={icons.back} resizeMode="contain" style={styles.backButtonIcon}/>
                    </TouchableOpacity>
                    <Image source={images.link} style={styles.headerLogo}/>
                </View>

                <View style={styles.content}>
                    <Text style={styles.headerTitle}>Your Story, Your Way!</Text>
                    <Text style={styles.subTitle}>Answer these 3 questions briefly to help us know you better.</Text>
                </View>

                <View style={styles.lottieContainer}>
                    <Lottie source={animations.register3} autoPlay loop style={styles.registerAnimation}/>
                </View>

                {/* Question 1 */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>What is something you're passionate about?</Text>
                    <TextInput
                        style={styles.input}
                        value={passion}
                        onChangeText={setPassion}
                        placeholder="Type your answer here"
                        placeholderTextColor="#888"
                    />
                </View>

                {/* Question 2 */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>If you could visit any place in the world, where would it be?</Text>
                    <TextInput
                        style={styles.input}
                        value={travel}
                        onChangeText={setTravel}
                        placeholder="Type your answer here"
                        placeholderTextColor="#888"
                    />
                </View>

                {/* Question 3 */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>What is a fun fact about yourself?</Text>
                    <TextInput
                        style={styles.input}
                        value={funFact}
                        onChangeText={setFunFact}
                        placeholder="Type your answer here"
                        placeholderTextColor="#888"
                    />
                </View>

                <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                    <Text style={styles.registerButtonText}>Next</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AdditionalInfo3;
