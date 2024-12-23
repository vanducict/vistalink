import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    btnContainer: {
        width: 50,
        height: 50,
        borderRadius: 10 / 1.25,
        marginInlineEnd: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    btnImg: (dimension) => ({
        width: dimension,
        height: dimension,
        borderRadius: 10 / 1.25,
    }),
});

export default styles;