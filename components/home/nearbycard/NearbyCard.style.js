import {StyleSheet} from "react-native";
import {COLORS, FONT, SIZES} from "../../../constants/theme";


const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: SIZES.xLarge,
        paddingVertical: SIZES.small,
        marginVertical: SIZES.small,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium,
        justifyContent: "space-between",
        shadowColor: COLORS.white,
    },
    logoContainer: {
        width: 50,
        height: 50,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    logoImage: {
        width: "70%",
        borderRadius: SIZES.medium,
        height: "70%",
    },
    companyName: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
        marginTop: SIZES.small / 1.5,
    },
    infoContainer: {
        marginTop: SIZES.large,
    },
    jobName: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
    },
    infoWrapper: {
        flexDirection: "row",
        marginTop: 5,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    publisher: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.regular,
    },
    ownerEmail: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
        marginTop: SIZES.small / 1.5,
    },
    linkName: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.bold,
    },
    location: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
    },
    openSpots: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.regular,
        color: COLORS.gray,
    },
    maxPeople: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.regular,
        color: COLORS.gray,
    },
    linkImagesContainer: {
        marginTop: SIZES.large,
        width: '100%',
        borderRadius: 20,       // Slightly larger radius for a smoother look
        height: 300,            // Image container height
        overflow: 'hidden',     // Hide overflow to apply rounded corners
        marginBottom: 20,       // Adjust spacing below the container
        backgroundColor: 'rgba(0, 0, 0, 0.3)',  // Optional: Add a dark overlay or background for contrast
        shadowColor: '#000',    // Shadow color
        shadowOffset: {width: 0, height: 5},  // Shadow positioning
        shadowOpacity: 0.1,     // Light shadow opacity
        shadowRadius: 10,       // Shadow blur radius
        elevation: 5,           // For Android devices to have shadow effect
    },
    linkImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',    // Keep aspect ratio intact, cover container area
        borderRadius: 20,       // Apply the same rounded corners to the image
    },
});

export default styles;