import {StyleSheet} from "react-native";
import {COLORS, FONT} from "../../../constants/theme";

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        height: 80,
        justifyContent: "space-around",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        backgroundColor: "#fff",
    },
    tabItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tabText: {
        color: "#e3e1dc",
        marginBottom: 5, // Adjusted for consistent spacing
        fontSize: 8,
        fontFamily: FONT.regular,
    },
    focusedText: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 10,
        fontFamily: FONT.bold,
    },
    tabIcon: {
        marginBottom: 5, // Adjusted for consistent spacing
        width: 25, // Unified size
        height: 25,
    },
    tabIconProfile: {
        marginBottom: 5, // Adjusted for consistent spacing
        width: 30, // Match the size of tabIcon
        height: 30,
        borderRadius: 15, // Keep the circle shape
        borderWidth: 1,
        borderColor: COLORS.primary,
        overflow: 'hidden', // Ensures the image stays within the circle
        alignItems: "center", // Center alignment
        justifyContent: "center",
    },
});


export default styles;