import {StyleSheet} from "react-native";
import {COLORS} from "../../../constants/theme";

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
    },
    icon: {
        color: "white",
    },
    approved: {
        backgroundColor: "#4CAF50", // Green
    },
    declined: {
        backgroundColor: "#F44336", // Red
    },
    pending: {
        backgroundColor: "#FFC107", // Yellow
    },
    expired: {
        backgroundColor: COLORS.gray,
        borderColor: COLORS.gray,
        borderWidth: 1,
    },
});


export default styles;