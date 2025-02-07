import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from "../../../../constants/theme";


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        padding: 20,
    },
    customHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButtonIcon: {
        width: 24,
        height: 24,
    },
    content: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subTitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    mainImageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    mainImageSlot: {
        width: Dimensions.get('window').width * 0.9, // Bigger size for the main profile picture
        height: Dimensions.get('window').width * 0.9,
        borderWidth: 2,
        borderColor: COLORS.gray,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    smallImagesRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
        width: '100%',
    },
    smallImageSlot: {
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.2,
        borderWidth: 2,
        borderColor: COLORS.gray,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: COLORS.gray,
        borderRadius: 15,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    profileLabel: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: COLORS.primary,
        color: '#fff',
        padding: 3,
        borderRadius: 20,
        fontSize: 12,
    },
    placeholderText: {
        fontSize: 30,
        color: COLORS.gray,
    },
    registerButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 20,
        maxHeight: 50,
        alignItems: 'center',
        marginTop: "auto",
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginTop: 10,
        fontSize: 14,
        color: 'gray',
    },
});

export default styles;
