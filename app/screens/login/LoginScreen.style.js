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
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.lightWhite,
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
        marginTop: 10,
        marginBottom: 60,
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
        marginTop: 100, // Add some space between buttons
        flexDirection: 'row', // Align the icon and text horizontally
        alignItems: 'center', // Vertically center the items
        justifyContent: 'center', // Center content inside the button
        backgroundColor: '#FFFFFF', // White background for Google button
        borderColor: '#DDDDDD', // Light border color
        borderWidth: 1, // Thin border
        borderRadius: 8, // Rounded corners
        paddingVertical: 10, // Vertical padding for the button
        paddingHorizontal: 15, // Horizontal padding for the button
        shadowColor: '#000', // Optional: Shadow for depth
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // Shadow for Android
        marginVertical: 10, // Add spacing between buttons
    },
    googleIcon: {
        width: 24, // Smaller icon size
        height: 24,
        resizeMode: 'contain',
        marginRight: 10, // Spacing between icon and text
    },
    googleButtonText: {
        fontSize: 16, // Clear and readable font size
        fontWeight: '600', // Slightly bold text
        color: '#333333', // Dark gray text for contrast
    },
});

export default styles;
