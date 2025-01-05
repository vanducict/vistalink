import {StyleSheet} from "react-native";
import {COLORS, FONT, SIZES} from "../../../constants/theme";

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
        fontFamily: FONT.regular,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        fontFamily: FONT.regular,
    },
    userEmail: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5,
        fontFamily: FONT.regular,
    },
    userBio: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        fontFamily: FONT.regular,
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
        fontFamily: FONT.regular,
    },
    signOutButton: {
        backgroundColor: "#f44336",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginTop: 20,
        width: "100%",
        fontFamily: FONT.regular,
        alignItems: "center",
    },
    signOutText: {
        fontFamily: FONT.regular,
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    }, buttonsContainer: {
        flexDirection: "column",
        marginHorizontal: 20,
    },
    userType: {
        color: COLORS.primary,
        fontWeight: "bold",
        fontSize: 16,
        marginVertical: SIZES.small,
        fontFamily: FONT.regular,
    }


});

export default styles;
