import React from "react";
import {useAuth} from "../utils/AuthenticationContext";
import Home from "./screens/home";
import Login from "./screens/login";
import Loading from "./screens/loading";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const App = () => {
    const {user, loading} = useAuth(); // Add loading state from the context or authentication provider.
    const Tab = createBottomTabNavigator();

    if (loading) {
        return <Loading loading={loading}/>;
    }

    return user ? (
        <Tab.Navigator
            screenOptions={{
                headerTitleAlign: "center", // Ensure the title is centered
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
            />
        </Tab.Navigator>


    ) : (
        <Login/>
    );
};

export default App;
