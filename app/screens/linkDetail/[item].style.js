import {COLORS, FONT, SIZES} from "../../../constants/theme";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.primary,
        fontFamily: FONT.bold,
    },
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        fontFamily: FONT.bold,
    },
    description: {
        marginBottom: SIZES.small * 2,
        fontFamily: FONT.regular,
    },
    detail: {
        fontSize: 16,
        color: COLORS.gray,
        marginTop: 10,
        fontFamily: FONT.regular,
    },
    loadingText: {
        fontSize: 16,
        textAlign: "center",
        color: COLORS.gray,
        fontFamily: FONT.regular,
    },
    applyButton: {
        backgroundColor: COLORS.tertiary,
        padding: 15,
        margin: 25,
        borderRadius: 8,
        fontFamily: FONT.regular,
        alignItems: "center",
    },
    applyButtonText: {
        fontFamily: FONT.regular,
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "bold",
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
    swiper: {
        height: 400, // Height of the swiper container
        overflow: 'hidden', // Hide any content that overflows
        position: 'relative', // Ensure absolute positioning works
    },
    avatar: {
        width: '100%', // Full width of the swiper container
        height: '100%', // Full height to fill swiper container
        resizeMode: 'cover', // Keep image aspect ratio intact
        borderRadius: 10, // Optional rounded corners
    },
    imageContainer: {
        position: 'relative', // Ensures pagination is correctly positioned inside
    },
    paginationStyle: {
        position: 'absolute', // Position the pagination inside the image
        bottom: 10, // Adjust to place it at the bottom of the image
        left: '50%',
        transform: [{translateX: '-50%'}], // Center pagination dots horizontally
        zIndex: 1, // Ensure pagination is above the image content
    },
    dot: {
        width: 8,  // Inactive dot size
        height: 8,
        margin: 4, // Space between the dots
        borderRadius: 4, // Circular dots
    },
    activeDot: {
        backgroundColor: COLORS.tertiary, // Active dot color
    },
    detailContainer: {
        marginTop: 15,
    }
});

export default styles;