import {Modal, Text, TouchableOpacity, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, {useState} from "react";
import styles from "./Applicants.style";
import {updateUserLinkStatus} from "../../../service/userLink/UserLinkService";
import Lottie from "lottie-react-native";
import animations from "../../../constants/animations";

const Applicants = ({userLinks, event, refreshUserLinks}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleApplicantStatus = async (id, approved) => {
        try {
            const status = approved ? "approved" : "declined";
            await updateUserLinkStatus(id, status);
            await refreshUserLinks(); // Refresh links after updating
        } catch (error) {
            console.error("Error updating applicant status:", error);
        }
    };

    const submitApplicants = () => {
        setIsModalVisible(true); // Open confirmation modal
    };

    const handleConfirm = async () => {
        setIsModalVisible(false); // Close modal
        try {
            // Iterate through all user links and approve them
            for (const link of userLinks) {
                if (link.status === "pending") {
                    await updateUserLinkStatus(link.linkId, "approved");
                }
            }
            await refreshUserLinks(); // Refresh user links after the update
            console.log("All applicants submitted and approved.");
        } catch (error) {
            console.error("Error confirming applicants:", error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Close modal without action
        console.log("Submission cancelled.");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Applicants</Text>
            {userLinks.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Lottie
                        source={animations.empty}
                        autoPlay
                        loop
                        style={{width: 100, height: 100}}
                    />
                    <Text style={styles.noApplicantsText}>No applicant have applied yet.</Text>
                </View>
            ) : (
                userLinks.map((link, index) => (
                    <View key={index} style={styles.applicantContainer}>
                        <Text style={styles.applicantName}>
                            {link.userDetails?.[link.userDetails.length - 1]?.firstName} {link.userDetails?.[link.userDetails.length - 1]?.name}
                        </Text>
                        <Text style={styles.applicantEmail}>{link.userEmail}</Text>
                        <Text style={styles.applicantStatus}>
                            Status:{" "}
                            {link.status === "approved" ? (
                                <Text style={styles.approvedText}>approved</Text>
                            ) : link.status === "declined" ? (
                                <Text style={styles.declinedText}>declined</Text>
                            ) : (
                                <Text style={styles.pendingText}>pending</Text>
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
                                    onPress={() => handleApplicantStatus(link.linkId, false)}
                                    style={[
                                        styles.declineProfileButton,
                                        event.expired && styles.disabledButton,
                                    ]}
                                    disabled={event.expired}
                                >
                                    <FontAwesome name="times-circle" size={40} color="white"/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleApplicantStatus(link.linkId, true)}
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
                disabled={event.expired}
                style={[
                    styles.saveAll,
                    event.expired && styles.disabledButton,
                ]}
                onPress={submitApplicants}
            >
                <Text style={styles.buttonText}>Submit & Chat</Text>
            </TouchableOpacity>

            {/* Confirmation Modal */}
            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Lottie
                            source={animations.select}
                            autoPlay
                            loop
                            style={{width: 200, height: 200}}
                        />
                        <Text style={styles.modalTitle}>Are you sure you have approved the right applicants?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButtonNo}
                                onPress={handleCancel}
                            >
                                <Text style={styles.modalButtonText}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButtonYes}
                                onPress={handleConfirm}
                            >
                                <Text style={styles.modalButtonText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Applicants;
