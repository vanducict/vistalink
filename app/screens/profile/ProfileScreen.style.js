import {StyleSheet} from "react-native";
import {COLORS} from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,

    },
    profileCard: {
        width: "100%",
        padding: 20,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: COLORS.lightWhite,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        alignItems: "center",
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
    },
    profileInfo: {
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    userEmail: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5,
    },
    userBio: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
    },
    editButton: {
        backgroundColor: COLORS.tertiary,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginTop: 15,
        width: "100%",
        alignItems: "center",
    },
    editButtonText: {
        color: "#fff",
        fontSize: 16, fontWeight: "bold",

    },
    signOutButton: {
        backgroundColor: "#f44336",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginTop: 20,
        width: "100%",
        alignItems: "center",
    },
    signOutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    }, buttonsContainer: {
        flexDirection: "column",
        marginHorizontal: 20,
    },

});

export default styles;
