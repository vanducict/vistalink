import {StyleSheet} from "react-native";
import {COLORS, FONT} from "../../../constants/theme";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
    customHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: COLORS.lightWhite,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd", // Optional border for separation
    },
    backButtonIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary,
    },
    scrollViewContent: {
        flexGrow: 1, // Ensures the content takes up available space without overflowing
        paddingBottom: 10, // Space for scrolling when keyboard is open
        paddingHorizontal: 10, // Adjust padding for the entire content
    },
    headerLogo: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    content: {
        paddingHorizontal: 15,
        marginTop: 20,
        flex: 1,  // Ensures that content takes the available space
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.primary,
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 16,
        color: "#888",
        marginBottom: 20,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start", // Aligns content at the top of the screen
        paddingHorizontal: 15,
        marginBottom: 10, // Adjusted for spacing when the keyboard is visible
    },
    inputText: {
        color: "#555",
        fontFamily: FONT.regular,
        marginVertical: "auto",
    },
    registerButton: {
        backgroundColor: COLORS.tertiary,
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20, // Ensured space at the bottom
    },
    registerButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontFamily: FONT.regular,
        fontSize: 16,
    },
    addImageButton: {
        backgroundColor: COLORS.secondary,
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    roleDropdown: {
        marginBottom: 10,
    },
    registerAnimation: {
        width: 150,
        height: 150,
        alignSelf: "center",
        maxHeight: 150,
        maxWidth: 150,
    },
    input: {
        height: 50, // Default height for other inputs
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 15, // Increased padding for better spacing
        fontSize: 16, // Ensure legible font size
        marginVertical: 10,
        backgroundColor: "#fff", // White background for inputs
    },
    descriptionInput: {
        height: 100, // Increased height for the description input
        textAlignVertical: 'top', // Ensures the text aligns at the top of the input field
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 15,
        paddingTop: 10, // Added padding at the top for multiline inputs
        fontSize: 16,
        backgroundColor: "#fff", // White background for description input
    },
});

export default styles;
