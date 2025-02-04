import {Image, Modal, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import styles from "./Applicants.style";
import {notifyUserLinkStatus, updateUserLinkStatus} from "../../../service/userLink/UserLinkService";
import Lottie from "lottie-react-native";
import animations from "../../../constants/animations";
import {updateLinkClosed} from "../../../service/link/LinkService";
import {useRouter} from "expo-router";
import {StreamChat} from "stream-chat";
import {useAuth} from "../../../utils/AuthenticationContext";
import {getUserForEmail} from "../../../service/user/UserService";
import UserProfile from "../../../app/screens/userProfile";
import icons from "../../../constants/icons";

const Applicants = ({userLinks, event, refreshUserLinks}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const router = useRouter();
    const isOverCapacity = (event.maxPeople - userLinks.filter(link => link.status === 'approved').length) < 0;
    const {user, loading} = useAuth();
    const [openUserProfile, setOpenUserProfile] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // Track selected user

    const handleApplicantStatus = async (id, userEmail, approved) => {
        try {
            const status = approved ? "approved" : "declined";
            await updateUserLinkStatus(id, userEmail, status);
            await refreshUserLinks(); // Refresh links after updating
        }
        catch (error) {
            console.error("Error updating applicant status:", error);
        }
    };

    const openModal = () => {
        setIsModalVisible(true);
    };

    async function createChatRoom(userLinks) {
        const chatClient = StreamChat.getInstance('vxujf6n9668d');
        try {
            if (!user) {
                throw new Error('currentUser is not defined. Please provide a valid user ID.');
            }

            // Ensure the user is connected
            if (!chatClient.user) {
                await chatClient.connectUser(
                    {
                        id: user?.user?.id, // Unique user ID
                    },
                    chatClient.devToken(user?.user?.id) // Replace with server-generated token in production
                );
            }

            // Validate event object
            if (!event || !event.id || !event.name || !event.description) {
                throw new Error('Invalid event object. Ensure event.id, event.name, and event.description are defined.');
            }

            // Create the channel
            console.log('Event:', event);
            console.log('User Links:', userLinks);

            const channel = chatClient.channel('messaging', event.id, {
                name: event.name,
                description: event.description,
            });

            await channel.create();


            const getMembers = async (userLinks) => {
                const members = await Promise.all(
                    userLinks.map(async (link) => {
                        const user = await getUserForEmail(link.userEmail);
                        console.log(`User for email ${link.userEmail}:`, user);
                        if (user && user.length > 0) {
                            return user[0]?.uid;  // Access the first element and get the `uid`
                        } else {
                            console.log(`User not found for email: ${link.userEmail}`);
                            return null;  // Ensure it returns null if no user is found
                        }
                    })
                );
                members.push(user?.user?.id);  // Add the current user to the list of members
                return members.filter(member => member !== null);  // Filter out any null values
            };


            const members = await getMembers(userLinks);
            console.log('Members:', members);

            if (members.length > 0) {
                await channel.addMembers(members);
            }

            try {
                // Fetch members once
                const members = await getMembers(userLinks);
                console.log('Members:', members);

                // Add members to the channel if the list is not empty
                if (members.length > 0) {
                    await channel.addMembers(members);
                }
            }
            catch (error) {
                console.error('Error adding members:', error);
            }


            console.log('Chat room created successfully!');
        }
        catch (err) {
            console.error('Error creating chat room or adding members:', err);
        }

        setIsModalVisible(false);
    }


    const handleConfirm = async () => {
        setIsModalVisible(false); // Close modal
        try {
            // Iterate through all user links and approve them
            for (const link of userLinks) {
                await notifyUserLinkStatus(link.linkId);
            }
            await updateLinkClosed(event.id, true);
            await createChatRoom(userLinks.filter(link => link.status === 'approved'));
            await refreshUserLinks(); // Refresh user links after the update
            router.back(); // Go back to the previous screen
            console.log("All applicants submitted and approved.");
        }
        catch (error) {
            console.error("Error confirming applicants:", error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Close modal without action
        console.log("Submission cancelled.");
    };

    const viewProfile = (userDetails) => {
        setSelectedUser(userDetails); // Pass the selected user data
        setOpenUserProfile(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Applicants</Text>
            {isOverCapacity ? <Text style={styles.errorMsg}>You can only approve {event.maxPeople}.</Text> : null}
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
                            {/* View Profile Button */}
                            <TouchableOpacity
                                style={[
                                    styles.viewProfileButton,
                                ]}
                                onPress={() => viewProfile(link.userDetails[0])}
                            >
                                <Text style={styles.buttonText}>View Profile</Text>
                            </TouchableOpacity>

                            <View style={styles.approvalButtonsContainer}>
                                {/* Decline Profile Button */}
                                <TouchableOpacity
                                    onPress={() => handleApplicantStatus(link.linkId, link.userEmail, false)}
                                    style={[
                                        styles.declineProfileButton,
                                        (event.expired || event.closed) && styles.disabledButton, // Disable when expired or closed
                                    ]}
                                    disabled={event.expired || event.closed} // Disable when expired or closed
                                >
                                    <Image
                                        source={icons.close}
                                        style={{width: 20, height: 20, resizeMode: "contain"}}
                                    />

                                </TouchableOpacity>

                                {/* Approve Profile Button */}
                                <TouchableOpacity
                                    onPress={() => handleApplicantStatus(link.linkId, link.userEmail, true)}
                                    style={[
                                        styles.approveProfileButton,
                                        (event.expired || event.closed) && styles.disabledButton, // Disable when expired or closed
                                    ]}
                                    disabled={event.expired || event.closed} // Disable when expired or closed
                                >
                                    <Image
                                        source={icons.check}
                                        style={{width: 20, height: 20, resizeMode: "contain"}}
                                    />

                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))
            )}
            <TouchableOpacity
                style={[
                    styles.saveAll,
                    (event.expired || event.closed || (event.maxPeople) - userLinks.filter(link => link.status === 'approved').length < 0) && styles.disabledButton,
                ]}
                disabled={event.expired || event.closed || (event.maxPeople) - userLinks.filter(link => link.status === 'approved').length < 0} // Disable when expired or closed
                onPress={openModal}
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
            <UserProfile
                visible={openUserProfile}
                userDetails={selectedUser}
                onClose={() => setOpenUserProfile(false)} // Close modal
            />
        </View>
    )
        ;
};

export default Applicants;
