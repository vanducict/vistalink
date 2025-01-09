import {StyleSheet} from "react-native";
import {COLORS, FONT, SIZES} from "../../../constants/theme";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: SIZES.small,  // Use dynamic padding for better responsiveness
        paddingVertical: SIZES.large,      // Add some vertical space on larger screens
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: SIZES.medium,        // Use a constant for spacing
        color: COLORS.secondary,
        fontFamily: FONT.regular,// Darker text
    },
    loadingIndicator: {
        marginTop: SIZES.small,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: SIZES.xxLarge / 0.1,
        height: 50,
        backgroundColor: "#fff", // White input background
        borderWidth: 1,
        borderColor: "#ddd", // Light border color
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 14,
        color: "#333",
        fontFamily: FONT.regular,
        // Responsive font scaling can be added here if needed
    },
    forgotPassword: {
        marginTop: 10,
        color: COLORS.tertiary,
        fontSize: 14,
        fontWeight: "600",
        textDecorationLine: "underline",
        fontFamily: FONT.regular,
    },
    registerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    registerText: {
        fontSize: 14,
        color: "#888",
        fontFamily: FONT.regular,
    },
    registerLink: {
        fontSize: 14,
        fontWeight: "bold",
        color: COLORS.tertiary,
        textDecorationLine: "underline",
        fontFamily: FONT.regular,
    },
    loginBtn: {
        paddingVertical: SIZES.small,   // Adjust padding using size constants
        marginVertical: SIZES.small,     // Space between button and other components
        backgroundColor: COLORS.tertiary,
        fontFamily: FONT.medium,
        color: COLORS.lightWhite,
        justifyContent: "center",
        alignItems: "center",
        maxHeight: 45,
        width: "325", // Full width button
        borderRadius: 8, // Round button corners for better UX
    },
    signInButton: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: FONT.regular,
    },
    facebookBtn: {
        backgroundColor: "#4267B2", // Facebook blue
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 25,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 65,
        width: "80%", // Adjust the width as needed
    },
    facebookButtonText: {
        color: "#fff", // White text
        fontSize: 16,
        fontWeight: "bold",
    },
    googleBtn: {
        backgroundColor: "#4285F4", // Google's blue color
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 25,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        width: "80%", // Adjust as needed
        flexDirection: "row", // Align icon and text horizontally
        borderWidth: 1,
        borderColor: "#ccc", // Optional: Adds border around button
    },
    googleButtonText: {
        color: "#fff", // White text
        fontSize: 16,
        fontWeight: "bold",
    },


});

export default styles;
