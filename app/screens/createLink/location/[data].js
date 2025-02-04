import styles from "./Location.style";
import {ActivityIndicator, Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import icons from "../../../../constants/icons";
import images from "../../../../constants/images";
import React, {useState} from "react";
import {useGlobalSearchParams, useRouter} from "expo-router";
import {COLORS} from "../../../../constants/theme";
import LocationPicker from "../../../../components/locationPicker/LocationPicker";
import * as Location from "expo-location";

const LocationScreen = () => {
    const router = useRouter();
    const {data} = useGlobalSearchParams();
    const [location, setLocation] = useState("");
    const [coordinates, setCoordinates] = useState({
        latitude: 50.8503,  // Default coordinates for Brussels
        longitude: 4.3517,  // Default coordinates for Brussels
    });
    const [loading, setLoading] = useState(false);

    // Function to fetch location coordinates using Geocoding API
    const fetchCoordinates = async () => {
        if (!location.trim()) {
            alert("Please enter a location.");
            return;
        }

        setLoading(true); // Show loading indicator while fetching
        try {
            let geoResult = await Location.geocodeAsync(location);
            if (geoResult.length > 0) {
                setCoordinates({
                    latitude: geoResult[0].latitude,
                    longitude: geoResult[0].longitude,
                });
            } else {
                alert("Location not found. Try a different name.");
            }
        }
        catch (error) {
            console.error("Geocoding Error:", error);
            alert("Error fetching location. Please try again.");
        }
        finally {
            setLoading(false); // Hide loading indicator after request is complete
        }
    };


    let handleKeyPress = () => {
        if (!location) {
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
            location: location
        };

        console.log("Updated Data:", updatedData);

        // Navigate to the next screen with the updated data
        router.push({
            pathname: '/screens/createLink/details/[data]',
            params: {data: JSON.stringify(updatedData)},
        });
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            {/* Custom Header */}
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={icons.back} resizeMode="contain" style={styles.backButtonIcon}/>
                </TouchableOpacity>
                <Image source={images.link} style={styles.headerLogo}/>
            </View>

            {/* Title & Input Field */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Set a location.</Text>
                <Text style={styles.welcomeMessage}>Type a place and navigate to it.</Text>

                {/* Location Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search location..."
                        placeholderTextColor={COLORS.gray}
                        value={location}
                        onChangeText={setLocation}
                    />
                    <TouchableOpacity onPress={fetchCoordinates} style={styles.searchButton}
                                      disabled={loading || !location.trim()}>
                        <Text style={styles.searchButtonText}>Go</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Show Loading Indicator */}
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary}/>
                </View>
            )}

            {/* Location Picker with Dynamic Navigation */}
            <View style={styles.locationPickerContainer}>
                <LocationPicker coordinates={coordinates}/>
            </View>

            {/* Next Button */}
            <TouchableOpacity style={styles.registerButton} onPress={() => handleKeyPress()}>
                <Text style={styles.registerButtonText}>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default LocationScreen;
