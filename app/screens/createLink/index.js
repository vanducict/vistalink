import React, {useState} from "react";
import {Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useRouter} from "expo-router";
import Lottie from "lottie-react-native";

import {COLORS} from "../../../constants/theme";
import Loading from "../../../components/common/loading/Loading";
import styles from "./CreateLinkScreen.style";
import animations from "../../../constants/animations";
import icons from "../../../constants/icons";
import images from "../../../constants/images";

const CreateLink = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const validateInputs = () => {
        if (!name.trim() || !description.trim()) {
            Alert.alert("Validation Error", "All fields are required.");
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (!validateInputs()) {
            return;
        }

        const data = {name: name, description: description};

        router.push({
            pathname: '/screens/createLink/location/[data]',
            params: {data: JSON.stringify(data)},
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

            <KeyboardAwareScrollView
                contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid
                enableAutomaticScroll
                extraHeight={150}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Let's get started!</Text>
                    <Text style={styles.welcomeMessage}>Create and customize your perfect link.</Text>
                </View>

                <View style={styles.loaderContainer}>
                    <Lottie source={animations.talking} autoPlay loop style={{width: 200, height: 200}}/>
                </View>

                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter a name for your link"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder="Add a brief description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={styles.createButton} onPress={handleNext} disabled={loading}>
                        {loading ? <Loading loading={loading}/> : <Text style={styles.createButtonText}>Next</Text>}
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default CreateLink;
