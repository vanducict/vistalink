import {StyleSheet} from "react-native";
import {COLORS, FONT} from "../../../constants/theme";

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
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 14,
        fontFamily: FONT.regular,
    },
    createButton: {
        backgroundColor: COLORS.tertiary,
        padding: 15,
        maxHeight: 50,
        borderRadius: 8,
        alignItems: "center",
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
    }
});


export default styles;