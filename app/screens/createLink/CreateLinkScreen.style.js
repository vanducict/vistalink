import {StyleSheet} from "react-native";
import {COLORS} from "../../../constants/theme";

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
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    createButton: {
        backgroundColor: COLORS.tertiary,
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    createButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "bold",
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
        width: 40,
        height: 40,
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
    },
    counterValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});


export default styles;