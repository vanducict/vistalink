import {StyleSheet} from "react-native";
import {COLORS, FONT} from "../../../constants/theme";

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
        marginVertical: "20%",
    },
    header: {
        fontSize: 16,
        marginBottom: 20,
        fontFamily: FONT.regular,
        textAlign: "center",
        color: "#555",
    },
    button: {
        backgroundColor: COLORS.tertiary,
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        width: 200,
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: "#fff",
        fontFamily: FONT.bold,
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default styles;
