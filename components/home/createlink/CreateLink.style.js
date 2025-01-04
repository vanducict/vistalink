import {StyleSheet} from "react-native";
import {COLORS} from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
    content: {
        flexGrow: 1, // Allows the content to expand and fill remaining space below the header
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically within the allocated space
        padding: 20,
        marginVertical: "50%",
    },
    header: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
        color: "#555",
    },
    button: {
        backgroundColor: COLORS.tertiary,
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        width: 200,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default styles;
