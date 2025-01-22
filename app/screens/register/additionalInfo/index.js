import React, {useState} from "react";
import {Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View,} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import styles from "../RegisterScreen.style";

const AdditionalInfo = ({route, navigation}) => {
    const {email, password, name, firstName, birthdate} = route.params;

    const [description, setDescription] = useState("");
    const [userType, setUserType] = useState("");
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: "User", value: "user"},
        {label: "Admin", value: "admin"},
    ]);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelection = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission required", "We need access to your media library.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0]);
        }
    };

    const handleSubmit = () => {
        if (!description || !userType || !selectedImage) {
            Alert.alert("Error", "Please complete all fields.");
            return;
        }

        console.log("Final Registration Data", {
            email,
            password,
            name,
            firstName,
            birthdate,
            description,
            userType,
            selectedImage,
        });

        Alert.alert("Success", "Your profile is complete!");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
                <Text style={styles.headerTitle}>Tell us more about yourself!</Text>
                <Text style={styles.subTitle}>
                    Add a description, select a role, and upload an image.
                </Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                placeholderTextColor="#888"
            />

            <DropDownPicker
                style={styles.roleDropdown}
                open={open}
                value={userType}
                items={items}
                setOpen={setOpen}
                placeholder="Select a role"
                setValue={setUserType}
                setItems={setItems}
            />

            <TouchableOpacity style={styles.addImageButton} onPress={handleImageSelection}>
                <Text style={styles.registerButtonText}>
                    {selectedImage ? "Change Image" : "Add Image"}
                </Text>
            </TouchableOpacity>

            {selectedImage && (
                <Image
                    source={{uri: selectedImage.uri}}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                        marginTop: 10,
                    }}
                />
            )}

            <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                <Text style={styles.registerButtonText}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default AdditionalInfo;
