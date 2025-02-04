import {StyleSheet} from "react-native";
import {COLORS, FONT, SIZES} from "../../../../constants/theme";

const styles = StyleSheet.create({
    customHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: COLORS.lightWhite,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    backButtonIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary,
    },
    headerLogo: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    headerContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    headerTitle: {
        fontSize: SIZES.xLarge,
        fontWeight: "bold",
        color: COLORS.primary,
    },
    welcomeMessage: {
        fontSize: SIZES.medium,
        color: COLORS.gray,
        textAlign: "center",
        marginTop: 5,
    },

    /** FIXED INPUT & SEARCH BUTTON **/
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        justifyContent: "space-between",
        width: "90%", // Make it slightly wider
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,  // Added padding to make it look balanced
        backgroundColor: COLORS.white,
    },
    input: {
        flex: 1, // Allows it to take most of the space
        fontSize: SIZES.medium,
        paddingVertical: 10,  // Increased padding for a comfortable look
        paddingHorizontal: 10,
        color: "#000",
    },
    searchButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        paddingVertical: 12,  // Increased padding for a bigger tap area
        paddingHorizontal: 15,
        marginLeft: 10,  // Added some spacing between input & button
    },
    searchButtonText: {
        color: COLORS.white,
        fontWeight: "bold",
        fontSize: SIZES.medium,
    },

    /** LOCATION PICKER **/
    locationPickerContainer: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },

    /** REGISTER BUTTON **/
    registerButton: {
        backgroundColor: COLORS.tertiary,
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
        width: "90%", // Makes it more centered
        alignSelf: "center", // Centers it
    },
    registerButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontFamily: FONT.regular,
        fontSize: 16,
    },
});

export default styles;
