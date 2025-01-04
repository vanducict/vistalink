import React from "react";
import animations from "../../../constants/animations";
import Lottie from "lottie-react-native";
import {View} from "react-native";
import styles from "./Loading.style";

const Loading = ({loading}) => {
    return (loading ?
        (
            <View style={styles.loadingIndicator}>
                <Lottie

                    source={animations.loading}
                    autoPlay
                    loop
                    style={{width: 50, height: 50}}
                />
            </View>

        ) : null)
};

export default Loading;

