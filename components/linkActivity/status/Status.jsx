import {Modal, Text, TouchableOpacity, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./Status.style";
import React, {useEffect, useState} from "react";
import Loading from "../../common/loading/Loading";
import animations from "../../../constants/animations";
import Lottie from "lottie-react-native";

export const Status = ({link, event}) => {
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Simulate loading completion based on status or event expiration
        if (link?.status || event?.expired) {
            setLoading(false);
        }

        // Trigger popup when status is approved
        if (link?.status === "approved" && link?.notified) {
            setShowPopup(true);
        }
    }, [link?.status, event?.expired]);

    let statusStyle, statusIcon, statusText;
    
    if (loading) {
        statusStyle = styles.loading;
        statusIcon = "spinner"; // Optional loading icon
        statusText = "Loading...";
    } else if (event?.expired) {
        statusStyle = styles.expired;
        statusIcon = "ban";
        statusText = "Expired";
    } else {
        switch (link?.status) {
            case "approved":
                if (link?.notified) {
                    statusStyle = styles.approved;
                    statusIcon = "check-circle";
                    statusText = "Approved";
                } else {
                    statusStyle = styles.pending;
                    statusIcon = "hourglass-half";
                    statusText = "Pending";
                }
                break;

            case "declined":
                if (link?.notified) {
                    statusStyle = styles.declined;
                    statusIcon = "times-circle";
                    statusText = "Declined";
                } else {
                    statusStyle = styles.pending;
                    statusIcon = "hourglass-half";
                    statusText = "Pending";
                }
                break;

            default:
                statusStyle = styles.pending;
                statusIcon = "hourglass-half";
                statusText = "Pending";
                break;
        }
    }

    return (
        <View style={[styles.container, statusStyle]}>
            {loading && <Loading loading={loading}/>}
            {!loading && (
                <>
                    <FontAwesome name={statusIcon} size={24} style={styles.icon}/>
                    <Text style={styles.text}>{statusText}</Text>
                </>
            )}

            {/* Popup Modal */}
            <Modal
                transparent={true}
                visible={showPopup}
                animationType="fade"
                onRequestClose={() => setShowPopup(false)}
            >
                <View style={styles.popupOverlay}>
                    <View style={styles.popup}>
                        <Lottie
                            source={animations.approve}
                            autoPlay
                            loop={false} // Stops after one loop for confetti
                            style={{width: 120, height: 120}}
                        />
                        <Text style={styles.popupTitle}>Congratulations!</Text>
                        <Text style={styles.popupText}>Your application has been approved.</Text>
                        <TouchableOpacity
                            style={[styles.popupButton, styles.primaryButton]}
                            onPress={() => setShowPopup(false)}
                        >
                            <Text style={styles.popupButtonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.popupButton, styles.secondaryButton]}
                            onPress={() => {
                                setShowPopup(false);
                                // Navigate to chat or perform another action
                            }}
                        >
                            <Text style={styles.popupButtonText}>Go to Chat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Status;
