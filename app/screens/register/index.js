import {Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useGlobalSearchParams, useRouter} from "expo-router";
import styles from './RegisterScreen.style'
import images from "../../../constants/images";
import icons from "../../../constants/icons";
import Lottie from "lottie-react-native";
import animations from "../../../constants/animations";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const Register = () => {
    const router = useRouter();
    const {email, password, name, firstName, birthdate} = useGlobalSearchParams();

    // State management for input fields
    const [firstNameState, setFirstNameState] = useState(firstName);
    const [nameState, setNameState] = useState(name);
    const [emailState, setEmailState] = useState(email);
    const [passwordState, setPasswordState] = useState(password);
    const [description, setDescription] = useState("");
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const handleConfirmDate = (date) => {
        const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        setDatePickerVisible(false); // Hide the date picker after selection
    };

    const handleSubmit = () => {
        if (!description) {
            Alert.alert("Error", "Please fill in all the fields.");
            return;
        }

        console.log({
            email: emailState,
            password: passwordState,
            name: nameState,
            firstName: firstNameState,
            birthdate,
            description,
        });

        Alert.alert("Success", "Your details have been submitted!");
        router.replace("/"); // Go back to home or another screen after submission
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollViewContent}
                enableOnAndroid={true}
                extraScrollHeight={5}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false} // Hides scroll indicator
                style={{maxHeight: "100%"}} // Prevent over-scrolling
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

                <Lottie
                    source={animations.register1}
                    autoPlay
                    loop
                    style={styles.registerAnimation}
                />

                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstNameState}
                    onChangeText={setFirstNameState}
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={nameState}
                    onChangeText={setNameState}
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={emailState}
                    onChangeText={setEmailState}
                    keyboardType="email-address"
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={passwordState}
                    onChangeText={setPasswordState}
                    secureTextEntry
                    placeholderTextColor="#888"
                />
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setDatePickerVisible(true)}
                >
                    <Text style={styles.inputText}>
                        {birthdate || "Tap to select birthdate"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                    <Text style={styles.registerButtonText}>Next</Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={() => setDatePickerVisible(false)}
                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default Register;
