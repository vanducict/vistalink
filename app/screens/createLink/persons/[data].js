import styles from "./Persons.style";
import {Alert, Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import icons from "../../../../constants/icons";
import images from "../../../../constants/images";
import React, {useState} from "react";
import {useGlobalSearchParams, useRouter} from "expo-router";
import {COLORS} from "../../../../constants/theme";
import Slider from '@react-native-community/slider';
import Lottie from "lottie-react-native";
import animations from "../../../../constants/animations";

const PersonsScreen = () => {
    const router = useRouter();
    const {data} = useGlobalSearchParams();

    // State for number of people selected
    const [peopleCount, setPeopleCount] = useState(1);

    let handleKeyPress = () => {
        if (!peopleCount) {
            Alert.alert('Error', 'Please fill in all fields and select at least one interest.');
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
            maxPeople: peopleCount
        };

        console.log("Updated Data:", updatedData);

        // Navigate to the next screen with the updated data
        router.push({
            pathname: '/screens/createLink/images/[data]',
            params: {data: JSON.stringify(updatedData)},
        });
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={icons.back} resizeMode="contain" style={styles.backButtonIcon}/>
                </TouchableOpacity>
                <Image source={images.link} style={styles.headerLogo}/>
            </View>

            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>How Many People Are You Searching For?</Text>
                <Text style={styles.welcomeMessage}>
                    Let us know how many people will be attending your event so we can help you connect.
                </Text>
            </View>

            <View style={styles.loaderContainer}>
                <Lottie source={animations.persons} autoPlay loop style={{width: 300, height: 200}}/>
            </View>

            <View style={styles.sliderContainer}>
                <Text style={styles.sliderValue}>{peopleCount} {peopleCount === 1 ? 'Person' : 'People'}</Text>

                {/* Slider Component */}
                <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={50}
                    step={1}
                    value={peopleCount}
                    onValueChange={(value) => setPeopleCount(value)}
                    minimumTrackTintColor={COLORS.primary}
                    maximumTrackTintColor={COLORS.gray}
                    thumbTintColor={COLORS.primary}
                />
            </View>

            <View style={styles.footerContainer}>
                {/* You can add any button or action here */}
                <TouchableOpacity style={styles.nextButton} onPress={() => handleKeyPress()}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default PersonsScreen;
