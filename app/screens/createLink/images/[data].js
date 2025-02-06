import {Alert, Image, Modal, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import * as ImagePicker from "expo-image-picker";
import {useGlobalSearchParams, useRouter} from "expo-router";
import icons from "../../../../constants/icons";
import images from "../../../../constants/images";
import {COLORS} from "../../../../constants/theme";
import styles from "./Images.style";
import Loading from "../../../../components/common/loading/Loading";
import {createLink} from "../../../../service/link/LinkService";
import {getCurrentUser} from "../../../../service/user/UserService"; // assuming you have a loading component

const ImagesScreen = () => {
    const router = useRouter();
    const {data} = useGlobalSearchParams();

    const [imagesState, setImagesState] = useState([null, null, null, null, null]); // 5 image slots
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false); // To disable buttons during loading
    const [currentUser, setCurrentUser] = useState(null);


    const fetchUser = async () => {
        try {
            setLoading(true);
            const user = await getCurrentUser();
            const currentUserData = user ? user.pop() : null;

            if (currentUserData) {
                setCurrentUser(currentUserData);
            } else {
                console.log("No user data available.");
            }
        }
        catch (error) {
            console.log("Error fetching user:", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser().then(r => r);
    }, []);

    // Function to pick an image for a specific slot
    const pickImageForSlot = async (index) => {
        if (disabled) {
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            const newImages = [...imagesState];
            newImages[index] = result.assets[0].uri; // Update the selected slot
            setImagesState(newImages);
        }
    };

    // Function to remove an image from a specific slot
    const removeImage = (index) => {
        if (disabled) {
            return;
        }
        const newImages = [...imagesState];
        newImages[index] = null;
        setImagesState(newImages);
    };


    const handleCreateEvent = async () => {
        if (!imagesState) {
            Alert.alert("Error", "Select at lease one image to continue.");
            return;
        }

        setLoading(true);
        // Parse the incoming data
        let parsedData = {};
        try {
            parsedData = data ? JSON.parse(data) : {};
            await createLink(
                parsedData.name,
                parsedData.description,
                parsedData.date,
                parsedData.location,
                parsedData.startTime,
                parsedData.endTime,
                parsedData.eventType,
                parsedData.maxPeople,
                currentUser.email
            );
            setLoading(false);
            Alert.alert("Success", "Event created successfully!");
            router.replace("/");
        }
        catch (error) {
            console.error('Error parsing data:', error);
        }

    };


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()} disabled={disabled}>
                    <Image source={icons.back} resizeMode="contain" style={styles.backButtonIcon}/>
                </TouchableOpacity>
                <Image source={images.link} style={styles.headerLogo}/>
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Got Any Pictures or Previews? 📸</Text>
                <Text style={styles.welcomeMessage}>
                    Share your event photos or sneak peeks to get your collaborators hyped up and ready to go!
                </Text>
            </View>


            {/* Main Profile Picture */}
            <View style={styles.mainImageContainer}>
                <TouchableOpacity style={styles.mainImageSlot} onPress={() => pickImageForSlot(0)} disabled={disabled}>
                    {imagesState[0] ? (
                        <>
                            <Image source={{uri: imagesState[0]}} style={styles.uploadedImage}/>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => removeImage(0)}
                                              disabled={disabled}>
                                <Text style={styles.deleteButtonText}>✕</Text>
                            </TouchableOpacity>

                        </>
                    ) : (
                        <Text style={styles.placeholderText}>+</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Small Images (Horizontal Layout) */}
            <View style={styles.smallImagesRow}>
                {imagesState.slice(1).map((image, index) => (
                    <TouchableOpacity key={index + 1} style={styles.smallImageSlot}
                                      onPress={() => pickImageForSlot(index + 1)} disabled={disabled}>
                        {image ? (
                            <>
                                <Image source={{uri: image}} style={styles.uploadedImage}/>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => removeImage(index + 1)}
                                                  disabled={disabled}>
                                    <Text style={styles.deleteButtonText}>✕</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <Text style={styles.placeholderText}>+</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Submit Button with Loading Indicator */}
            <TouchableOpacity style={styles.registerButton} disabled={disabled} onPress={() => handleCreateEvent()}>
                {loading ? (
                    <Loading loading={loading}/>
                ) : (
                    <Text style={styles.registerButtonText}>Finish</Text>
                )}
            </TouchableOpacity>

            {/* Modal for loading */}
            <Modal transparent={true} animationType="fade" visible={loading} onRequestClose={() => setLoading(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Loading loading={loading}/>
                        <Text style={styles.modalText}>Creating your link...</Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default ImagesScreen;
