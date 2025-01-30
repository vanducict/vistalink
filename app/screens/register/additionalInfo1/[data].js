import {
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import icons from "../../../../constants/icons";
import images from "../../../../constants/images";
import {useRouter} from "expo-router";
import styles from "./[data].style.js";
import Lottie from "lottie-react-native";
import animations from "../../../../constants/animations";

const AdditionalInfo1 = () => {
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [open, setOpen] = useState(false);
    const [userType, setUserType] = useState(null);
    const [items, setItems] = useState([
        {label: 'Student', value: 'student'},
        {label: 'Teacher', value: 'teacher'},
    ]);

    // Prepare the data to pass
    const data = {};
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelection = async () => {
        Alert.alert('Image Picker', 'Image selection logic goes here.');
    };

    const handleSubmit = () => {
        if (!description || !userType) {
            Alert.alert('Error', 'Please fill in all the fields.');
            return;
        }

        console.log({
            description,
            userType,
            selectedImage,
        });

        // Navigate to the additional information screen with data
        router.push({
            pathname: '/screens/register/additionalInfo2/[data]',
            params: {data: JSON.stringify(data)},
        });
    };

    // Handle key press to dismiss keyboard when Enter is pressed
    const handleKeyPress = (e) => {
        if (e.nativeEvent.key === 'Enter') {
            Keyboard.dismiss(); // Dismiss keyboard when 'Enter' key is pressed
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={[styles.scrollViewContent, {flex: 1}]} // Correct syntax
                behavior={'padding'}
            >

                <View style={styles.customHeader}>
                    <TouchableOpacity onPress={() => router.replace("/screens/register")}>
                        <Image
                            source={icons.back}
                            resizeMode="contain"
                            style={styles.backButtonIcon}
                        />
                    </TouchableOpacity>
                    <Image source={images.link} style={styles.headerLogo}/>
                </View>

                <View style={styles.content}>
                    <Text style={styles.headerTitle}>Almost There!</Text>
                    <Text style={styles.subTitle}>
                        Almost there! Let's wrap up your profile setup and make sure everything is ready for you.
                    </Text>
                </View>

                <View style={styles.lottieContainer}>
                    <Lottie
                        source={animations.register2}
                        autoPlay
                        loop
                        style={styles.registerAnimation}
                    />
                </View>

                {/* Description Input */}
                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Tell us about yourself..."
                    value={description}
                    onChangeText={setDescription}
                    placeholderTextColor="#888"
                    multiline
                    returnKeyType="done" // This will show the 'Done' key on the keyboard
                    onKeyPress={handleKeyPress} // Listen to key press event
                />

                {/* DropDownPicker for selecting user role */}
                <DropDownPicker
                    open={open}
                    value={userType}
                    items={items}
                    setOpen={setOpen}
                    placeholder="Select a role"
                    setValue={setUserType}
                    setItems={setItems}
                />

                {/* Add Image Button */}
                <TouchableOpacity onPress={handleImageSelection}>
                    <Text style={styles.registerButtonText}>
                        {selectedImage ? 'Change Image' : 'Add Image'}
                    </Text>
                </TouchableOpacity>

                {/* Display selected image */}
                {selectedImage && (
                    <Image
                        source={{uri: selectedImage.uri}}
                        style={styles.selectedImage}
                    />
                )}

                {/* Submit Button */}
                <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                    <Text style={styles.registerButtonText}>Next</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AdditionalInfo1;
