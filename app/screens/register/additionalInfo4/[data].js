import {Alert, Image, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {useGlobalSearchParams, useRouter} from 'expo-router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import icons from "../../../../constants/icons";
import styles from "./[data].style";
import {handleRegister} from "../../../../service/registration/RegistrationService";

const AdditionalInfo4 = () => {
    const router = useRouter();
    const {data} = useGlobalSearchParams(); // Extract channelId from route params
    const [images, setImages] = useState([null, null, null, null, null]); // 5 slots

    const pickImageForSlot = async (index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });

        if (!result.canceled) {
            const newImages = [...images];
            newImages[index] = result.assets[0].uri; // Update the selected slot
            setImages(newImages);
        }
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);
    };

    const handleSubmit = () => {
        if (images.every(img => img === null)) {
            Alert.alert('Error', 'Please upload at least one picture.');
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

        // Add images to the existing data
        const updatedData = {
            ...parsedData, // Preserve previous data
            images: images.filter(img => img !== null),
        };

        handleRegister(updatedData).then(r => {
            Alert.alert('Success', 'Registration completed successfully!');
            router.replace("/");
        });

    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <GestureHandlerRootView>
                <KeyboardAvoidingView style={[styles.scrollViewContent, {flex: 1}]} behavior={'padding'}>
                    <View style={styles.customHeader}>
                        <TouchableOpacity onPress={() => router.replace("/screens/register")}>
                            <Image source={icons.back} resizeMode="contain" style={styles.backButtonIcon}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.headerTitle}>Share Your Smile!</Text>
                        <Text style={styles.subTitle}>Upload Your Best Pictures & Brighten the Cloud!</Text>
                    </View>

                    {/* Main Profile Picture */}
                    <View style={styles.mainImageContainer}>
                        <TouchableOpacity style={styles.mainImageSlot} onPress={() => pickImageForSlot(0)}>
                            {images[0] ? (
                                <>
                                    <Image source={{uri: images[0]}} style={styles.uploadedImage}/>
                                    <TouchableOpacity style={styles.deleteButton} onPress={() => removeImage(0)}>
                                        <Text style={styles.deleteButtonText}>✕</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.profileLabel}>Profile Picture</Text>
                                </>
                            ) : (
                                <Text style={styles.placeholderText}>+</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Four Small Images (Horizontal Layout) */}
                    <View style={styles.smallImagesRow}>
                        {images.slice(1).map((image, index) => (
                            <TouchableOpacity key={index + 1} style={styles.smallImageSlot}
                                              onPress={() => pickImageForSlot(index + 1)}>
                                {image ? (
                                    <>
                                        <Image source={{uri: image}} style={styles.uploadedImage}/>
                                        <TouchableOpacity style={styles.deleteButton}
                                                          onPress={() => removeImage(index + 1)}>
                                            <Text style={styles.deleteButtonText}>✕</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <Text style={styles.placeholderText}>+</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                        <Text style={styles.registerButtonText}>Finish</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
};


export default AdditionalInfo4;
