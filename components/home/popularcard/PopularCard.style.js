import {StyleSheet} from "react-native";
import {COLORS, FONT, SIZES} from "../../../constants/theme";


const styles = StyleSheet.create({
    container: {
        width: 300,
        padding: SIZES.xLarge,
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
        height: "70%",
    },
    ownerEmail: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
        marginTop: SIZES.small / 1.5,
    },
    infoContainer: {
        marginTop: SIZES.large,
    },
    linkName: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.medium,
    },
    infoWrapper: {
        flexDirection: "row",
        marginTop: 5,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    location: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.regular,
    },
    maxPeople: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.regular,
        color: COLORS.gray,
    },
});

export default styles;