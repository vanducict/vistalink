import {StyleSheet} from "react-native";
import {COLORS, FONT, SIZES} from "../../../constants/theme";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f9f9f9", // Match background to avoid color mismatch
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
        color: COLORS.secondary,          // Darker text
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
        fontSize: 16,
        color: "#333",
        // Responsive font scaling can be added here if needed
    },
    forgotPassword: {
        marginTop: 10,
        color: COLORS.tertiary,
        fontSize: 14,
        fontWeight: "600",
        textDecorationLine: "underline",
    },
    registerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    registerText: {
        fontSize: 14,
        color: "#888",
    },
    registerLink: {
        fontSize: 14,
        fontWeight: "bold",
        color: COLORS.tertiary,
        textDecorationLine: "underline",
    },
    loginBtn: {
        paddingVertical: SIZES.small,   // Adjust padding using size constants
        marginVertical: SIZES.small,     // Space between button and other components
        backgroundColor: COLORS.tertiary,
        fontFamily: FONT.medium,
        color: COLORS.lightWhite,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        borderRadius: 8, // Round button corners for better UX
    },
});

export default styles;
