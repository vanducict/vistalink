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
    }
};


export default styles;