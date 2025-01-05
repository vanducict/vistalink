import {StyleSheet} from "react-native";
import {COLORS, FONT} from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    activityContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    activityDetails: {
        flex: 1,
        fontFamily: FONT.regular,
    },
    activityTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: FONT.bold,
    },
    activityDescription: {
        fontSize: 14,
        color: '#555',
        fontFamily: FONT.regular,
    },
    activityDate: {
        fontSize: 12,
        color: '#aaa',
        fontFamily: FONT.regular,
    },
    activityLocation: {
        fontSize: 12,
        color: '#333',
        fontFamily: FONT.regular,
    },
    activityTime: {
        fontSize: 12,
        color: '#888',
        fontFamily: FONT.regular,
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: COLORS.tertiary,
        borderRadius: 5,
        height: 40,
        width: "auto",

    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontFamily: FONT.regular,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
    },
    tabButton: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: "#f0f0f0",
    },
    activeTabButton: {
        backgroundColor: COLORS.primary,
    },
    tabText: {
        color: "#000",
    },
    activeTabText: {
        color: "#fff",
    },
});

export default styles;
