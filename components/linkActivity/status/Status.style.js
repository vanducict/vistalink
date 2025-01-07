import {StyleSheet} from "react-native";
import {COLORS, FONT} from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        width: "80%",
        margin: "auto",
        borderRadius: 8,
        marginVertical: 5,
        minWidth: 120,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
        color: "white",
        fontFamily: FONT.regular
    },
    icon: {
        color: "white",
    },
    approved: {
        backgroundColor: "#4CAF50", // Green
        fontFamily: FONT.regular
    },
    declined: {
        backgroundColor: "#F44336", // Red
        fontFamily: FONT.regular
    },
    pending: {
        backgroundColor: "#FFC107", // Yellow
    },
    expired: {
        backgroundColor: COLORS.gray,
        borderColor: COLORS.gray,
        borderWidth: 1,
        fontFamily: FONT.regular
    },
    popupOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark semi-transparent background
    },
    popup: {
        width: 300,
        padding: 20,
        backgroundColor: "#ffffff",
        borderRadius: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    popupTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#4CAF50", // Green for approval
        marginBottom: 10,
        textAlign: "center",
        fontFamily: FONT.regular
    },
    popupText: {
        fontSize: 16,
        color: "#333",
        marginBottom: 20,
        textAlign: "center",
        lineHeight: 22,
        fontFamily: FONT.regular

    },
    popupButton: {
        width: "100%",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    primaryButton: {
        backgroundColor: COLORS.secondary, // Green for action buttons
    },
    secondaryButton: {
        backgroundColor: "#007BFF", // Blue for navigation
    },
    popupButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: FONT.bold
    },

});


export default styles;