import {StyleSheet} from "react-native";
import {COLORS, FONT} from "../../../constants/theme";

const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: COLORS.lightWhite,
        },
        container: {
            padding: 20,
            justifyContent: "center",
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
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
        registerButton: {
            backgroundColor: COLORS.tertiary,
            padding: 15,
            borderRadius: 8,
            alignItems: "center",
            maxHeight: 50,
        },
        registerButtonText: {
            color: COLORS.white,
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: FONT.regular,
        },
        backButton: {
            fontSize: 16,
            color: COLORS.tertiary,
            padding: 10,
            paddingHorizontal: 10,

        },
        pickerContainer: {
            width: "100%",
            marginVertical: 10,
            display: "flex",
            paddingHorizontal: 10,
            backgroundColor: COLORS.lightWhite,
            borderRadius: 10,
            fontFamily: FONT.regular,
        },
        label: {
            fontSize: 16,
            marginBottom: 5,
            color: "#555",
            fontFamily: FONT.regular,
        },
        picker: {
            height: 50,
            width: "100%",
            color: "#000",
        },
        roleDropdown: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 15,
            fontSize: 16,
            fontFamily: FONT.regular,
        },
        addImageButton: {
            backgroundColor: COLORS.primary,
            padding: 15,
            borderRadius: 8,
            alignItems: "center",
            maxHeight: 50,
        }
    })
;

export default styles;
