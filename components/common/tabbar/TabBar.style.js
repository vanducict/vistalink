import {StyleSheet} from "react-native";

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
        marginBottom: 20,
        fontSize: 8,
    },
    focusedText: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 10,
    },
    tabIcon: {
        width: 25,
        height: 25,
        flex: 1,
    }
});


export default styles;