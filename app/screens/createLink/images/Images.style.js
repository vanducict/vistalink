import {Dimensions, StyleSheet} from "react-native";
import {COLORS, FONT} from "../../../../constants/theme";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.lightWhite,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.primary,
        marginBottom: 20,
        textAlign: "center",
        fontFamily: FONT.regular,
    },
    createButton: {
        backgroundColor: COLORS.tertiary,
        padding: 15,
        maxHeight: 50,
        borderRadius: 8,
        alignItems: "center",
        marginTop: "auto"
    },
    createButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: FONT.regular,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    counterLabel: {
        fontSize: 16,
        fontFamily: FONT.regular,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    counterControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#f1f1f1', // Light gray background for the controls
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    counterButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007BFF', // Primary button color
        borderRadius: 5,
        marginHorizontal: 10,
    },
    decreaseButton: {
        backgroundColor: '#FF4F4F', // Red for decrement button
    },
    increaseButton: {
        backgroundColor: '#4CAF50', // Green for increment button
    },
    counterButtonText: {
        fontSize: 20,
        color: '#fff',
        fontFamily: FONT.regular,
    },
    counterValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: FONT.regular,
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
    headerLogo: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    headerContainer: {
        margin: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    welcomeMessage: {
        fontSize: 16,
        color: "#666",
        marginTop: 5,
    },
    descriptionInput: {
        height: 180, // Adjust height for multiline text
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
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingTop: 15,
        borderRadius: 8,
        paddingLeft: 15,
        fontSize: 16,
        marginVertical: 10,
        backgroundColor: "#fff",
    },
    loaderContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    sliderContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderValue: {
        fontSize: 20,
        color: COLORS.primary,
        marginBottom: 10,
    },
    slider: {
        width: '80%',
        height: 40,
    },
    footerContainer: {
        padding: 20,
        marginTop: 'auto',
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: COLORS.tertiary,
        padding: 15,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
    nextButtonText: {
        fontSize: 18,
        color: 'white',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        padding: 20,
    },
    subTitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    mainImageContainer: {
        alignItems: 'center',
        margin: 5,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    mainImageSlot: {
        width: Dimensions.get('window').width * 0.9, // Bigger size for the main profile picture
        height: Dimensions.get('window').width * 0.9,
        borderWidth: 2,
        borderColor: COLORS.gray,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    smallImagesRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
        width: '100%',
    },
    smallImageSlot: {
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.2,
        borderWidth: 2,
        borderColor: COLORS.gray,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: COLORS.gray,
        borderRadius: 15,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    profileLabel: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: COLORS.primary,
        color: '#fff',
        padding: 3,
        borderRadius: 20,
        fontSize: 12,
    },
    placeholderText: {
        fontSize: 30,
        color: COLORS.gray,
    },
    registerButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
        maxHeight: 50,
        margin: "auto",
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginTop: 10,
        fontSize: 14,
        color: 'gray',
    },
});


export default styles;