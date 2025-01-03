import {StyleSheet} from "react-native";
import {COLORS} from "../../../constants/theme";

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
        },
        input: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 15,
            fontSize: 16,
        },
        registerButton: {
            backgroundColor: COLORS.tertiary,
            padding: 15,
            borderRadius: 8,
            alignItems: "center",
        },
        registerButtonText: {
            color: COLORS.white,
            fontSize: 14,
            fontWeight: "bold",
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
        },
        label: {
            fontSize: 16,
            marginBottom: 5,
            color: "#555",
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
        }

    })
;

export default styles;
