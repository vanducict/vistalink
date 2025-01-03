import {COLORS, SIZES} from "../../../constants/theme";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.primary,
    },
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        marginBottom: SIZES.small * 2,
    },
    detail: {
        fontSize: 16,
        color: COLORS.gray,
        marginBottom: 5,
    },
    loadingText: {
        fontSize: 16,
        textAlign: "center",
        color: COLORS.gray,
    },
    applyButton: {
        backgroundColor: COLORS.tertiary,
        padding: 15,
        margin: 25,
        borderRadius: 8,
        alignItems: "center",
    },
    applyButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default styles;