import {Text, View} from "react-native";
import styles from "./Welcome.style";
import {useEffect, useState} from "react";
import {getCurrentUser} from "../../../service/user/UserService";
import Loading from "../../common/loading/Loading";

const Welcome = ({}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user.pop());
            } catch (error) {
                console.log("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser().then(r => r);
    }, []);

    if (!currentUser) {
        return <Loading loading={loading}/>;
    }


    return (
        <View>
            <View>
                <Text style={styles.userName}>Hello {currentUser.firstName}.</Text>
                <Text style={styles.welcomeMessage}>Find your perfect link</Text>
            </View>

        </View>
    );
};

export default Welcome;
