import {ActivityIndicator} from "react-native";

import React from "react";
import styles from "./Loading.style";
import {COLORS} from "../../../constants/theme";


const Loading = ({loading}) => {
    return (loading ?
        (
            <ActivityIndicator size="large" color={COLORS.tertiary} style={styles.loadingIndicator}/>
        ) : null)
};

export default Loading;

