import {Stack, useRouter} from "expo-router";
import Welcome from "../../../components/home/welcome/Welcome";
import Popular from "../../../components/home/popular/Popular";
import Nearby from "../../../components/home/nearby/Nearby";
import {FlatList, Image, SafeAreaView} from "react-native";
import {COLORS} from "../../../constants/theme";
import React, {useEffect, useState} from "react";
import images from "../../../constants/images";
import SearchBar from "../../../components/home/search/SearchBar";
import {getCurrentUser} from "../../../service/user/UserService";
import Loading from "../loading";
import CreateLink from "../../../components/home/createlink/CreateLink";

const Home = () => {
    const router = useRouter();
    const [activeEventType, setActiveEventType] = useState(null);
    const [activeSearchQuery, setActiveSearchQuery] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const CONSUMER_TYPE = "Consumer";
    const COLLABORATOR_TYPE = "Collaborator";

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const user = await getCurrentUser();
                if (user && user.length > 0) {
                    setCurrentUser(user.pop());
                } else {
                    console.log("No user data found.");
                }
            } catch (error) {
                console.log("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser().then(r => r);
    }, []);

    const sections_collaborator = [
        {
            id: '1',
            component: <Welcome/>
        },
        {
            id: '2',
            component: <SearchBar setActiveEventType={setActiveEventType} setActiveSearchQuery={setActiveSearchQuery}/>
        },
        {id: '3', component: <Popular eventType={activeEventType} searchQuery={activeSearchQuery}/>},
        {id: '4', component: <Nearby eventType={activeEventType} searchQuery={activeSearchQuery}/>},
    ];

    const sections_consumer = [
        {
            id: '1',
            component: <Welcome/>
        }, {
            id: '2',
            component: <CreateLink/>
        }

    ];


    if (!currentUser) {
        return (
            <Loading/>
        );
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                backgroundColor={COLORS.lightWhite}
                options={{
                    headerTitle: () => (
                        <Image
                            source={images.link} // Path to your image
                            style={{width: 40, height: 40, resizeMode: 'contain'}} // Adjust size
                        />
                    ),
                    headerTitleAlign: 'center', // Ensure the title is centered
                }}
            />

            <FlatList
                data={currentUser.userType === CONSUMER_TYPE ? sections_consumer : sections_collaborator}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => item.component}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{padding: 16}}
            />
        </SafeAreaView>
    );
};

export default Home;
