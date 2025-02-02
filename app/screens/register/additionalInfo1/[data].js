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
import {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import icons from "../../../../constants/icons";
import images from "../../../../constants/images";
import {useGlobalSearchParams, useRouter} from "expo-router";
import styles from "./[data].style.js";
import Lottie from "lottie-react-native";
import animations from "../../../../constants/animations";
import {getAllUserTypes} from "../../../../service/user/UserService";

const AdditionalInfo1 = () => {
    const router = useRouter();
    const {data} = useGlobalSearchParams(); // Extract channelId from route params
    const [description, setDescription] = useState('');
    const [open, setOpen] = useState(false);
    const [userType, setUserType] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                const types = await getAllUserTypes();
                if (types && types.length > 0) {
                    const formattedItems = types.map((type, index) => ({
                        label: type,
                        value: type,
                        key: `${type}-${index}`,
                    }));
                    setItems(formattedItems);
                } else {
                    console.log("No types found.");
                }
            }
            catch (error) {
                console.log("Error fetching types:", error);
            }
        };
        fetchUserTypes().then(r => r);
    }, []);


    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelection = async () => {
        Alert.alert('Image Picker', 'Image selection logic goes here.');
    };

    const handleSubmit = () => {
        if (!description || !userType) {
            Alert.alert('Error', 'Please fill in all the fields.');
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
            description,
            userType,
        };

        console.log("Updated Data:", updatedData);

        // Navigate to the next screen with the updated data
        router.push({
            pathname: '/screens/register/additionalInfo2/[data]',
            params: {data: JSON.stringify(updatedData)},
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
                    <Text style={styles.headerTitle}>Introduce Yourself & Define Your Role.</Text>
                    <Text style={styles.subTitle}>Share a bit about who you are and select the role that you will
                        represent.</Text>
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

                {/* Dynamic role description */}
                {userType && (
                    <Text style={styles.roleDescription}>
                        {userType === 'Consumer'
                            ? 'This is a user who places ads to find connections. Think of it as someone who’s looking for others to connect with, possibly to collaborate, network, or get advice. They take an active role in seeking connections by creating ads or posts.'
                            : userType === 'Collaborator'
                                ? 'A collaborator is someone who searches for ads placed by consumers or others, and then applies to them to form a connection. Instead of creating the ad, they are searching through available ads and responding to them, hoping to connect with others based on shared interests or needs.'
                                : 'This is a default message for any other user role, such as a teacher, admin, or another role that isn’t a Consumer or Collaborator.'}
                    </Text>
                )}

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
