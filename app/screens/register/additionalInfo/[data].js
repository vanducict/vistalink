import {Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../RegisterScreen.style';
import icons from "../../../../constants/icons";
import images from "../../../../constants/images";
import {useRouter} from "expo-router";

const AdditionalInfo = () => {
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [open, setOpen] = useState(false);
    const [userType, setUserType] = useState(null);
    const [items, setItems] = useState([
        {label: 'Student', value: 'student'},
        {label: 'Teacher', value: 'teacher'},
    ]);
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

        Alert.alert('Success', 'Your details have been submitted!');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollViewContent}
                enableOnAndroid={true}
                extraScrollHeight={10}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={{maxHeight: '100%'}}
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
                    <Text style={styles.headerTitle}>Almost There!</Text>
                    <Text style={styles.subTitle}>
                        Let's finish setting up your profile. Add a bio, choose your role, and upload a picture to
                        complete your setup.
                    </Text>
                </View>

                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    placeholderTextColor="#888"
                    multiline
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
                        {selectedImage ? 'Change Image' : 'Add Image'}
                    </Text>
                </TouchableOpacity>

                {selectedImage && (
                    <Image
                        source={{uri: selectedImage.uri}}
                        style={styles.selectedImage}
                    />
                )}

                <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                    <Text style={styles.registerButtonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default AdditionalInfo;
