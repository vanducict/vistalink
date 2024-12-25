// src/App.js
import React from "react";
import {useAuth} from "../utils/AuthenticationContext";
import Home from "./screens/home/HomeScreen";
import Login from "./screens/login/LoginScreen";


const App = () => {
    const {user} = useAuth();
    return user ? <Home/> : <Login/>;

};

export default App;
