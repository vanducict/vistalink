import {
    Alert,
    FlatList,
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {useState} from 'react';

import icons from "../../../../constants/icons";
import images from "../../../../constants/images";
import {useGlobalSearchParams, useRouter} from "expo-router";
import styles from "./[data].style.js";
import Lottie from "lottie-react-native";
import animations from "../../../../constants/animations";

const interestsList = [
    "Music", "Sports", "Reading", "Gaming", "Traveling",
    "Cooking", "Tech", "Fitness", "Fashion", "Movies",
    "Photography", "Writing", "Dancing", "Art & Design"
];

const AdditionalInfo2 = () => {
    const router = useRouter();
    const {data} = useGlobalSearchParams();
    const [description, setDescription] = useState('');
    const [jobState, setJobState] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);

    const toggleInterest = (interest) => {
        setSelectedInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((item) => item !== interest)
                : [...prev, interest]
        );
    };

    const handleSubmit = () => {
        if (!jobState || selectedInterests.length === 0) {
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
            jobTitle: jobState,
            selectedInterests,
        };

        console.log("Updated Data:", updatedData);

        // Navigate to the next screen with the updated data
        router.push({
            pathname: '/screens/register/additionalInfo3/[data]',
            params: {data: JSON.stringify(updatedData)},
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={[styles.scrollViewContent, {flex: 1}]} behavior={'padding'}>
                <View style={styles.customHeader}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.back} resizeMode="contain" style={styles.backButtonIcon}/>
                    </TouchableOpacity>
                    <Image source={images.link} style={styles.headerLogo}/>
                </View>

                <View style={styles.content}>
                    <Text style={styles.headerTitle}>We want to get to know you! </Text>
                    <Text style={styles.subTitle}>Let’s make this experience personal. Pick what describes you
                        best!</Text>
                </View>

                <View style={styles.lottieContainer}>
                    <Lottie source={animations.register3} autoPlay loop style={styles.registerAnimation}/>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Job Title"
                    value={jobState}
                    onChangeText={setJobState}
                    placeholderTextColor="#888"
                />

                <Text style={styles.sectionTitle}>Select Your Interests:</Text>
                <FlatList
                    data={interestsList}
                    numColumns={2} // Ensures proper grid layout
                    keyExtractor={(item) => item}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={[
                                styles.interestButton,
                                selectedInterests.includes(item) && styles.selectedInterestButton
                            ]}
                            onPress={() => toggleInterest(item)}
                        >
                            <Text
                                style={[
                                    styles.interestText,
                                    selectedInterests.includes(item) && styles.selectedInterestText
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{paddingHorizontal: 10}} // Adjust spacing if needed
                />


                <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                    <Text style={styles.registerButtonText}>Next</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AdditionalInfo2;
