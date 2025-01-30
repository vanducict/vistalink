import {StyleSheet} from 'react-native';
import {COLORS, FONT} from "../../../../constants/theme";


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
        borderBottomColor: "#ddd",
    },
    backButtonIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 30, // Ensures smooth scrolling when the keyboard is open
        paddingHorizontal: 20,
    },
    headerLogo: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    content: {
        paddingHorizontal: 15,
        marginTop: 20,
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
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 15,
        fontSize: 16,
        marginVertical: 10,
        backgroundColor: "#fff",
    },
    inputText: {
        color: "#555",
        textAlignVertical: "center",
        textAlign: "left",
        alignContent: "center",
        marginTop: 15,
        fontFamily: FONT.regular,
    },
    registerButton: {
        backgroundColor: COLORS.tertiary,
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    registerButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontFamily: FONT.regular,
        fontSize: 16,
    },
    registerAnimation: {
        width: 150, // Fixed width
        height: 150, // Fixed height
        alignSelf: "center", // Center the animation in the available space
        position: "relative", // Position the animation absolutely
    },
    lottieContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100, // Adjust this height to your needs
        marginBottom: 20, // Ensure some space between the animation and other elements
    },

    descriptionInput: {
        height: 120, // Adjust height for multiline text
        borderColor: '#ccc', // Light gray border color
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingTop: 15, // Padding on top for better text positioning
        fontSize: 16, // Font size for the text
        fontFamily: FONT.regular, // Use your custom font here
        color: "#555", // Text color for description
        backgroundColor: "#fff", // White background for the input box
        marginVertical: 10, // Vertical margin between other inputs or elements
        textAlignVertical: "top", // Align the text to the top for multiline input
    },


});

export default styles;
