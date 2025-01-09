import {StyleSheet} from "react-native";
import {COLORS, FONT, SIZES} from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.xLarge,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: COLORS.primary,
    },
    headerBtn: {
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: COLORS.gray,
    },
    cardsContainer: {
        marginTop: SIZES.medium,
    },
    emptyContainer: {
        flex: 1,
        margin: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
        fontFamily: FONT.regular,
    },

});

export default styles;