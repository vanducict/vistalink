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
        height: "90%",
        backgroundColor: "#ffffff",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    scrollContainer: {
        paddingVertical: 10,
    },
    infoGroup: {
        marginBottom: 20,
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
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    avatar: {
        width: '100%', // Full width of the swiper
        height: 500,   // Adjust height for a better fit
        resizeMode: 'cover', // Ensure the image fills the container without distortion
    },
    swiper: {
        height: 500, // Height of the swiper
    },
    imageName: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
        fontFamily: FONT.regular,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.7)', // Add a subtle shadow to improve text visibility
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 5,
        zIndex: 1, // Ensure the name text is above other elements
    },
    paginationStyle: {
        position: 'absolute', // Position the pagination outside of the image
        bottom: 10, // Adjust pagination position to avoid overlap
        left: '50%',
        transform: [{translateX: '-50%'}], // Center the pagination
        zIndex: 0, // Ensure the pagination is below the text
    },
    infoValue: {
        fontSize: 16,
        fontFamily: FONT.bold,
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
    imageNameOverlay: {
        position: 'absolute',
        bottom: 40,  // Adjust distance from bottom
        right: 10,  // Adjust for proper alignment
        zIndex: 10,  // Ensure it stays on top
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 5,
    },

    closeButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: FONT.regular,
        fontWeight: "bold",
    },
    interestsList: {
        marginTop: 10,
        flexDirection: 'row', // Align items horizontally
        flexWrap: 'wrap', // Allow wrapping if there are too many items
    },
    interestItemContainer: {
        backgroundColor: COLORS.secondary, // Set a background color
        borderRadius: 20, // Rounded corners
        paddingVertical: 8,
        paddingHorizontal: 12, // Add padding for some space inside the "chip"
        marginRight: 10, // Add spacing between items
        marginBottom: 10, // Add spacing below items
    },
    interestItem: {
        fontSize: 16,
        fontFamily: FONT.regular,
        color: "#fff", // White text to contrast against background
    },
    noInterestsText: {
        fontSize: 16,
        fontFamily: FONT.regular,
        color: "#999",
        marginTop: 5,
    },
});

export default styles;
