import {COLORS, FONT} from "../../../constants/theme";

const styles = {
    container: {
        padding: 20,
        backgroundColor: COLORS.lightWhite,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: FONT.bold,
        color: COLORS.primary,
        marginBottom: 10,
    },
    viewProfileButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.tertiary,
        paddingVertical: 8, // Increased padding for better touch area
        paddingHorizontal: 10,
        borderRadius: 10, // More rounded for a modern look
        marginVertical: 15,
        justifyContent: "center", // Center content
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4, // Android shadow effect
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: FONT.medium,
    },

    approveProfileButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        justifyContent: "center", // Center the content
    },
    declineProfileButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        justifyContent: "center", // Center the content
    },
    description: {
        fontSize: 14,
        fontFamily: FONT.regular,
        color: COLORS.primary,
        marginBottom: 20,
    },
    detail: {
        fontSize: 14,
        fontFamily: FONT.regular,
        color: COLORS.gray,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: FONT.regular,
        fontWeight: "bold",
        marginBottom: 10,
    },
    loadingText: {
        fontSize: 16,
        color: COLORS.gray,
        textAlign: "center",
        fontFamily: FONT.regular,
    },
    approvalButtonsContainer: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '40%',
        maxWidth: 300,  // Optional: Ensures it doesn't get too large
        paddingHorizontal: 10, // Optional: Adds spacing from edges
        marginTop: 'auto', // Ensure the parent supports this
        gap: 10, // React Native 0.71+
    },
    noApplicantsText: {
        fontSize: 16,
        fontFamily: FONT.regular,
        color: COLORS.gray,
        textAlign: "center",
        marginTop: 20,
    },
    // Style for approved applicants with more aesthetic green
    approvedContainer: {
        backgroundColor: '#25D366', // Light green (LimeGreen) background
        borderColor: '#25D366', // Darker green border for contrast
        elevation: 5, // Stronger shadow for green to make it stand out
        shadowColor: '#388E3C', // Slight greenish shadow
    },
    approvedText: {
        color: '#4CAF50', // Soft green for approved
        fontWeight: 'bold',
        fontSize: 16,
    },
    declinedText: {
        color: '#F44336', // Muted red for declined
        fontWeight: 'bold',
        fontSize: 16,
    },
    pendingText: {
        color: '#FF9800', // Soft orange for pending
        fontWeight: 'bold',
        fontSize: 16,
    },
    // Style for declined applicants with more aesthetic red
    declinedContainer: {
        backgroundColor: '#E53935', // Soft red (Salmon) background
        borderColor: '#E53935', // Darker red border for contrast
        elevation: 5, // Stronger shadow for red to make it stand out
        shadowColor: '#C2185B', // Slight pinkish shadow for red
    },
    applicantContainer: {
        backgroundColor: "#fff",
        padding: 20, // Increased padding for better spacing
        marginVertical: 10,
        borderRadius: 12, // Softer rounded corners
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15, // Slightly stronger shadow for depth
        shadowRadius: 4,
        elevation: 3, // Adds depth on Android
        borderWidth: 1, // Adds subtle border
        borderColor: "#E0E0E0", // Light gray border for contrast
    },
    applicantName: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: FONT.bold,
        color: COLORS.primary,
    },
    applicantEmail: {
        fontSize: 16,
        fontFamily: FONT.regular,
        color: COLORS.gray,
    },
    applicantStatus: {
        fontSize: 16,
        color: COLORS.gray,
        marginBottom: 10,
        fontFamily: FONT.regular,
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rejectButton: {
        backgroundColor: COLORS.tertiary,
        padding: 10,
        borderRadius: 5,
    },
    expiredContainer: {
        backgroundColor: '#d3d3d3', // Gray background for expired items
        opacity: 0.6, // Make it visually distinct
    },
    disabledButton: {
        backgroundColor: '#a9a9a9', // Gray out buttons for expired items
    },
    saveAll: {
        backgroundColor: '#4CAF50', // A pleasing green for success actions
        paddingVertical: 12,       // Vertical padding for comfortable touch size
        paddingHorizontal: 20,     // Horizontal padding for balanced width
        marginVertical: 15,        // Space between button and surrounding elements
        alignItems: 'center',      // Center the text horizontally
        borderRadius: 8,           // Rounded corners for a modern look
        shadowColor: '#000',       // Shadow for depth
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,              // Shadow for Android
    }, modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.90)", // Semi-transparent background
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#ffffff", // White background for the modal
        width: "80%", // Take 80% of the screen width
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Shadow for Android
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
        textAlign: "center",
        fontFamily: FONT.regular,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        width: "100%",
    },
    modalButtonYes: {
        backgroundColor: COLORS.tertiary, // Green for Yes button
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        flex: 1,
    },
    modalButtonNo: {
        backgroundColor: "#F44336", // Red for No button
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        flex: 1,
        marginRight: 10,
    },
    modalButtonText: {
        color: "#fff", // White text for buttons
        fontSize: 16,
        fontWeight: "600",
        fontFamily: FONT.regular,
    },
    emptyContainer: {
        flex: 1,
        margin: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
        fontFamily: FONT.regular,
    }, errorMsg: {
        color: '#FF4C4C',
        fontFamily: FONT.bold
    }

};


export default styles;