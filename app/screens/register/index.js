import {Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {useGlobalSearchParams, useRouter} from "expo-router";
import styles from './RegisterScreen.style';
import images from "../../../constants/images";
import icons from "../../../constants/icons";
import Lottie from "lottie-react-native";
import animations from "../../../constants/animations";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Register = () => {
    const router = useRouter();
    const {email, password, name, firstName, birthdate: initialBirthdate} = useGlobalSearchParams();

    // State management for input fields
    const [firstNameState, setFirstNameState] = useState(firstName);
    const [nameState, setNameState] = useState(name);
    const [emailState, setEmailState] = useState(email);
    const [passwordState, setPasswordState] = useState(password);
    const [birthdate, setBirthdate] = useState(initialBirthdate || ""); // Initialize with query param or empty
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const handleConfirmDate = (date) => {
        const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        setBirthdate(formattedDate); // Update birthdate state
        setDatePickerVisible(false); // Hide the date picker after selection
    };

    const handleSubmit = () => {
        // Validate all required fields
        if (!firstNameState || !nameState || !emailState || !passwordState || !birthdate) {
            Alert.alert("Error", "Please fill in all the fields.");
            return;
        }

        // Prepare the data to pass
        const data = {
            email: emailState,
            password: passwordState,
            name: nameState,
            firstName: firstNameState,
            birthdate,
        };

        // Navigate to the additional information screen with data
        router.push({
            pathname: '/screens/register/additionalInfo/[data]',
            params: {data: JSON.stringify(data)},
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAwareScrollView
                style={{flex: 1}}
                contentContainerStyle={styles.scrollViewContent}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled" // Ensures keyboard doesn’t hide inputs
                showsVerticalScrollIndicator={false} // Hides scroll indicator
                // Removed extraScrollHeight and enableAutomaticScroll
            >
                <View style={styles.customHeader}>
                    <TouchableOpacity onPress={() => router.replace("/screens/login")}>
                        <Image
                            source={icons.back}
                            resizeMode="contain"
                            style={styles.backButtonIcon}
                        />
                    </TouchableOpacity>
                    <Image source={images.link} style={styles.headerLogo}/>
                </View>

                <View style={styles.content}>
                    <Text style={styles.headerTitle}>Let's get started!</Text>
                    <Text style={styles.subTitle}>
                        Fill in your basic details to begin your journey.
                    </Text>
                </View>

                <View style={styles.lottieContainer}>
                    <Lottie
                        source={animations.register1}
                        autoPlay
                        loop
                        style={styles.registerAnimation}
                    />
                </View>


                {/* First Name Input */}
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstNameState}
                    onChangeText={setFirstNameState}
                    placeholderTextColor="#888"
                />

                {/* Name Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={nameState}
                    onChangeText={setNameState}
                    placeholderTextColor="#888"
                />

                {/* Email Input */}
                <TextInput
                    style={styles.input} // Add margin to prevent keyboard push
                    placeholder="Email"
                    value={emailState}
                    onChangeText={setEmailState}
                    keyboardType="email-address"
                    placeholderTextColor="#888"
                />

                {/* Password Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={passwordState}
                    onChangeText={setPasswordState}
                    secureTextEntry
                    placeholderTextColor="#888"
                />

                {/* Birthdate Picker */}
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setDatePickerVisible(true)}
                >
                    <Text style={styles.inputText}>
                        {birthdate || "Tap to select birthdate"}
                    </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    style={styles.input}
                    onConfirm={handleConfirmDate}
                    onCancel={() => setDatePickerVisible(false)}
                />

                {/* Submit Button */}
                <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                    <Text style={styles.registerButtonText}>Next</Text>
                </TouchableOpacity>


            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default Register;
