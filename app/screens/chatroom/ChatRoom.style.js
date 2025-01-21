import {StyleSheet} from "react-native";
import {FONT} from "../../../constants/theme";

const styles = StyleSheet.create({
    messageContainer: {
        maxWidth: '70%',
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    ownMessage: {
        alignSelf: 'flex-end',
        fontFamily: FONT.regular,
        backgroundColor: '#DCF8C6', // Light green for your messages
    },
    otherMessage: {
        alignSelf: 'flex-start',
        fontFamily: FONT.regular,
        backgroundColor: '#E8E8E8', // Light gray for others' messages
    },
    username: {
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: FONT.bold,
        marginBottom: 5,
        color: '#555',
    },
    messageText: {
        fontSize: 16,
        fontFamily: FONT.regular,
        color: '#000',
    },
    deletedMessageText: {
        color: 'gray', // Gray text for deleted messages
        fontStyle: 'italic', // Optional: Italicize the text
        fontFamily: FONT.regular,
    },
    sendButton: {
        backgroundColor: 'green', // Green background for the button
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
        fontFamily: FONT.regular,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10, // Adjust spacing if needed
    },
    sendButtonText: {
        color: 'white', // White text color
        fontWeight: 'bold',
        fontFamily: FONT.bold,
        fontSize: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: '100%',
    },
    headerLeft: {
        flex: 1,
    },
    backButton: {
        fontSize: 20,
        color: '#007bff',
        fontWeight: 'bold',
    },
    headerCenter: {
        flex: 3, // Takes more space for title and subtitle
        alignItems: 'center',
    },
    headerRight: {
        flex: 1, // Adjust space for the right container
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: FONT.bold,
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        fontFamily: FONT.regular,
        marginTop: 2, // Add slight spacing below the title
    },
    optionsButton: {
        fontSize: 24,
        color: '#007bff',
        marginLeft: 10, // Spacing between options and edge
    },
});


export default styles;


