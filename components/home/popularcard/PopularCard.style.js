import {StyleSheet} from "react-native";
import {COLORS, FONT, SIZES} from "../../../constants/theme";


const styles = StyleSheet.create({
    container: {
        width: 250,
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
    location: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
    },
});

export default styles;