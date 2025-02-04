import React, {useEffect, useState} from "react";
import MapView, {Marker} from "react-native-maps";
import {View} from "react-native";
import styles from "./LocationPicker.style";

const LocationPicker = ({coordinates}) => {
    const [region, setRegion] = useState({
        latitude: 50.8503,  // Default coordinates for Brussels
        longitude: 4.3517,  // Default coordinates for Brussels
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    useEffect(() => {
        if (coordinates) {
            setRegion({
                ...region,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
            });
        }
    }, [coordinates]);

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={region}>
                {coordinates && (
                    <Marker coordinate={coordinates} title="Selected Location"/>
                )}
            </MapView>
        </View>
    );
};


export default LocationPicker;
