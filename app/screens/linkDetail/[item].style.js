import {COLORS, FONT, SIZES} from "../../../constants/theme";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.primary,
        fontFamily: FONT.bold,
    },
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        fontFamily: FONT.bold,
    },
    description: {
        marginBottom: SIZES.small * 2,
        fontFamily: FONT.regular,
    },
    detail: {
        fontSize: 16,
        color: COLORS.gray,
        marginBottom: 5,
        fontFamily: FONT.regular,
    },
    loadingText: {
        fontSize: 16,
        textAlign: "center",
        color: COLORS.gray,
        fontFamily: FONT.regular,
    },
    applyButton: {
        backgroundColor: COLORS.tertiary,
        padding: 15,
        margin: 25,
        borderRadius: 8,
        fontFamily: FONT.regular,
        alignItems: "center",
    },
    applyButtonText: {
        fontFamily: FONT.regular,
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default styles;