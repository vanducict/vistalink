import {StyleSheet} from "react-native";
import {COLORS, FONT} from "../../../constants/theme";

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modalContent: {
        width: "95%",
        height: "80%",
        backgroundColor: "#ffffff",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontFamily: FONT.regular,
        fontWeight: "600",
        color: "#333",
        marginBottom: 15,
        textAlign: "center",
    },
    scrollContainer: {
        paddingVertical: 10,
    },
    infoGroup: {
        marginBottom: 15,
        borderBottomWidth: 1,
        fontFamily: FONT.regular,
        borderBottomColor: "#eee",
        paddingBottom: 10,
    },
    infoLabel: {
        fontSize: 16,
        fontFamily: FONT.regular,
        fontWeight: "bold",
        color: "#555",
        marginBottom: 3,
    },
    infoValue: {
        fontSize: 16,
        fontFamily: FONT.regular,
        color: "#333",
    },
    noDetailsText: {
        fontSize: 16,
        color: "#999",
        fontFamily: FONT.regular,
        textAlign: "center",
        marginVertical: 20,
    },
    closeButton: {
        marginTop: 15,
        alignSelf: "center",
        backgroundColor: COLORS.tertiary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: FONT.regular,
        fontWeight: "bold",
    },
});


export default styles;
