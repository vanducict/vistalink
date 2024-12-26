import {StyleSheet} from "react-native";
import {COLORS, FONT} from "../../../constants/theme";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f9f9f9", // Match background to avoid color mismatch
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: COLORS.secondary, // Darker text
    },
    loadingIndicator: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff", // White input background
        borderWidth: 1,
        borderColor: "#ddd", // Light border color
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        color: "#333",
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
        paddingVertical: 10,
        marginVertical: 10,
        backgroundColor: COLORS.tertiary,
        fontFamily: FONT.medium,
        color: COLORS.lightWhite,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        display: "flex",
        width: "100%",
    }

});

export default styles;
