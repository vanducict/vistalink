import React from "react";
import {useAuth} from "../utils/AuthenticationContext";
import Home from "./screens/home";
import Loading from "./screens/loading";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Profile from "./screens/profile";
import TabBar from "../components/common/tabbar/TabBar";
import Login from "./screens/login";
import {COLORS} from "../constants/theme";
import Links from "./screens/links";
import Chats from "./screens/chats";

const App = () => {
    const {user, loading} = useAuth(); // Add loading state from the context or authentication provider.
    const Tab = createBottomTabNavigator();

    if (loading) {
        return <Loading loading={loading}/>;
    }

    return user ? (
        <Tab.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                tabBarStyle: {
                    position: "absolute",
                    backgroundColor: COLORS.lightWhite,
                    borderTopWidth: 0,
                    elevation: 0,
                },
            }}
            tabBar={(props) => <TabBar {...props}/>}
        >
            <Tab.Screen
                name="Home"
                component={Home}
            />
            <Tab.Screen
                name="MyLinks"
                component={Links}
            />
            <Tab.Screen
                name="Chats"
                component={Chats}
            />
            <Tab.Screen
                name="MyProfile"
                component={Profile}
            />

        </Tab.Navigator>
    ) : (
        <Login/>
    );
};

export default App;
