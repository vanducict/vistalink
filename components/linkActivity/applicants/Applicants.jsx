import {Text, TouchableOpacity, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, {useState} from "react";
import styles from "./Applicants.style";
import {updateUserLinkStatus} from "../../../service/userLink/UserLinkService";

const Applicants = ({userLinks, event, refreshUserLinks}) => {
    const [statusUpdates, setStatusUpdates] = useState({});

    const handleStatusChange = (id, approved) => {
        setStatusUpdates((prev) => ({
            ...prev,
            [id]: approved ? "approved" : "declined",
        }));
    };

    const handleSaveAll = async () => {
        try {
            const updatePromises = Object.entries(statusUpdates).map(([id, status]) =>
                updateUserLinkStatus(id, status)
            );
            await Promise.all(updatePromises);
            await refreshUserLinks();
            setStatusUpdates({}); // Clear the local state after saving
        } catch (error) {
            console.error("Error updating statuses:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Applicants</Text>
            {userLinks.length === 0 ? (
                <Text style={styles.noApplicantsText}>No user links found.</Text>
            ) : (
                userLinks.map((link, index) => (
                    <View key={index} style={styles.applicantContainer}>
                        <Text style={styles.applicantName}>
                            {link.userDetails?.[link.userDetails.length - 1]?.firstName} {link.userDetails?.[link.userDetails.length - 1]?.name}
                        </Text>
                        <Text style={styles.applicantEmail}>{link.userEmail}</Text>
                        <Text style={styles.applicantStatus}>
                            Status:{" "}
                            {statusUpdates[link.linkId] ? (
                                <Text
                                    style={
                                        statusUpdates[link.linkId] === "approved"
                                            ? styles.approvedText
                                            : styles.declinedText
                                    }
                                >
                                    {statusUpdates[link.linkId]}
                                </Text>
                            ) : link.status === "approved" ? (
                                <Text style={styles.approvedText}>Approved</Text>
                            ) : link.status === "declined" ? (
                                <Text style={styles.declinedText}>Declined</Text>
                            ) : (
                                <Text style={styles.pendingText}>Pending</Text>
                            )}
                        </Text>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity
                                style={[
                                    styles.viewProfileButton,
                                    event.expired && styles.disabledButton,
                                ]}
                                disabled={event.expired}
                            >
                                <Text style={styles.buttonText}>View Profile</Text>
                            </TouchableOpacity>
                            <View style={styles.approvalButtonsContainer}>
                                <TouchableOpacity
                                    onPress={() => handleStatusChange(link.linkId, false)}
                                    style={[
                                        styles.declineProfileButton,
                                        event.expired && styles.disabledButton,
                                    ]}
                                    disabled={event.expired}
                                >
                                    <FontAwesome name="times-circle" size={40} color="white"/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleStatusChange(link.linkId, true)}
                                    style={[
                                        styles.approveProfileButton,
                                        event.expired && styles.disabledButton,
                                    ]}
                                    disabled={event.expired}
                                >
                                    <FontAwesome name="check-circle" size={40} color="white"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))
            )}

            <TouchableOpacity
                style={styles.saveAll}
                onPress={handleSaveAll}
            >
                <Text style={styles.buttonText}>Save & Submit</Text>
            </TouchableOpacity>


        </View>
    );
};

export default Applicants;
