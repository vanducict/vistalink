import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Stack, useGlobalSearchParams, useRouter} from "expo-router"; // Use `useSearchParams` for query params
import {COLORS} from "../../../constants/theme";
import icons from "../../../constants/icons";
import React, {useState} from "react";
import styles from "./[item].style";
import images from "../../../constants/images";

const LinkDetail = () => {
    const {item} = useGlobalSearchParams(); // Safely get query parameter
    const event = item ? JSON.parse(item) : null; // Parse the event data
    const router = useRouter();

    const spotsTaken = 0; // Replace this with the actual data (e.g., the number of spots already taken)
    const totalSpots = event ? event.maxPeople : 1; // Total number of spots

    const [loading, setLoading] = useState(false); // Set loading state
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerTitleAlign: "center",
                    headerShown: true,
                    headerTitle: () => (
                        <Image
                            source={images.link} // Path to your image
                            style={{width: 40, height: 40, resizeMode: 'contain'}} // Adjust size
                        />
                    ),
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image
                                source={icons.back}
                                resizeMode="contain"
                                style={{width: 20, height: 20}}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <ScrollView>
                <View style={styles.container}>
                    {event ? (
                        <>
                            <Text style={styles.title}>{event.name}</Text>
                            <Text style={styles.description}>{event.description}</Text>
                            <Text style={styles.detail}>Location: {event.location}</Text>
                            <Text style={styles.detail}>Date: {event.date}</Text>
                            <Text style={styles.detail}>
                                Time: {event.startTime} - {event.endTime}
                            </Text>
                            <Text style={styles.detail}>Type: {event.eventType}</Text>
                            <Text style={styles.detail}>
                                Open Spots: {spotsTaken}/{totalSpots}
                            </Text>
                            <Text style={styles.detail}>
                                Contact: {event.ownerEmail}
                            </Text>
                        </>
                    ) : (
                        <Text style={styles.loadingText}>Loading...</Text>
                    )}
                </View>
                <TouchableOpacity style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>
                        {loading ? "Registering..." : "Register"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>


        </SafeAreaView>
    );
};

export default LinkDetail;
