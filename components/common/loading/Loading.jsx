import React from "react";
import animations from "../../../constants/animations";
import Lottie from "lottie-react-native";


const Loading = ({loading}) => {
    return (loading ?
        (
            <Lottie
                source={animations.loading}
                autoPlay
                loop
                style={{width: 50, height: 50}}
            />
        ) : null)
};

export default Loading;

