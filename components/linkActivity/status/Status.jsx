import {Text, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./Status.style";
import {useEffect, useState} from "react";
import Loading from "../../common/loading/Loading";

export const Status = ({status, event}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading completion based on status or event expiration
        if (status || event?.expired) {
            setLoading(false);
        }
    }, [status, event?.expired]);

    let statusStyle, statusIcon, statusText;

    if (loading) {
        statusStyle = styles.loading;
        statusIcon = "spinner"; // Optional loading icon
        statusText = "Loading...";
    } else if (event?.expired) {
        statusStyle = styles.expired;
        statusIcon = "ban";
        statusText = "Expired";
    } else {
        switch (status) {
            case "approved":
                statusStyle = styles.approved;
                statusIcon = "check-circle";
                statusText = "Approved";
                break;
            case "declined":
                statusStyle = styles.declined;
                statusIcon = "times-circle";
                statusText = "Declined";
                break;
            default:
                statusStyle = styles.pending;
                statusIcon = "hourglass-half";
                statusText = "Pending";
                break;
        }
    }

    return (
        <View style={[styles.container, statusStyle]}>
            {loading && <Loading loading={loading}/>}
            {!loading && (
                <>
                    <FontAwesome name={statusIcon} size={24} style={styles.icon}/>
                    <Text style={styles.text}>{statusText}</Text>
                </>
            )}
        </View>
    );
};

export default Status;
