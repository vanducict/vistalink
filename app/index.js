import React from "react";
import {useAuth} from "../utils/AuthenticationContext";
import Home from "./screens/home";
import Login from "./screens/login";
import Loading from "./screens/loading";


const App = () => {
    const {user, loading} = useAuth(); // Add loading state from the context or authentication provider.

    if (loading) {
        return (
            <Loading loading={loading}/>
        );
    }

    return user ? <Home/> : <Login/>;
};

export default App;
