import {COLORS, FONT} from "../../../constants/theme";

const styles = {
    container: {
        padding: 20,
        backgroundColor: COLORS.lightWhite,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        fontFamily: FONT.bold,
    },
    viewProfileButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.tertiary,
        padding: 10,
        marginTop: "auto",
        height: 50,
        borderRadius: 5,
        marginVertical: 10,
        justifyContent: "center", // Center the content
    },
    approveProfileButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#28a745", // Green color for approval
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        justifyContent: "center", // Center the content
    },
    declineProfileButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#dc3545", // Red color for decline
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        justifyContent: "center", // Center the content
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: FONT.regular,
    },
    description: {
        fontSize: 14,
        fontFamily: FONT.regular,
        color: COLORS.primary,
        marginBottom: 20,
    },
    detail: {
        fontSize: 16,
        color: COLORS.gray,
        marginTop: 10,
        fontFamily: FONT.regular,
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
        height: 70, // Set the height of the container
        flexDirection: 'row', // Align buttons horizontally
        justifyContent: 'space-between', // Add spacing between buttons
        alignItems: 'center', // Center buttons vertically
        width: '40%', // Set the width of the container
        marginTop: "auto", // Optional: Add spacing above the buttons
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
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
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
    customHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: COLORS.lightWhite,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    backButtonIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary,
    },
    headerLogo: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    swiper: {
        height: 400, // Height of the swiper container
        overflow: 'hidden', // Hide any content that overflows
        position: 'relative', // Ensure absolute positioning works
    },
    avatar: {
        width: '100%', // Full width of the swiper container
        height: '100%', // Full height to fill swiper container
        resizeMode: 'cover', // Keep image aspect ratio intact
        borderRadius: 10, // Optional rounded corners
    },
    imageContainer: {
        position: 'relative', // Ensures pagination is correctly positioned inside
    },
    paginationStyle: {
        position: 'absolute', // Position the pagination inside the image
        bottom: 10, // Adjust to place it at the bottom of the image
        left: '50%',
        transform: [{translateX: '-50%'}], // Center pagination dots horizontally
        zIndex: 1, // Ensure pagination is above the image content
    },
    dot: {
        width: 8,  // Inactive dot size
        height: 8,
        margin: 4, // Space between the dots
        borderRadius: 4, // Circular dots
    },
    activeDot: {
        backgroundColor: COLORS.tertiary, // Active dot color
    }
};


export default styles;