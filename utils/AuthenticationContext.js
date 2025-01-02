import React, {createContext, useContext, useEffect, useState} from "react";
import supabase from "../app/lib/supabase";
import {useRouter} from "expo-router";

const AuthContext = createContext(undefined);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Subscribe to auth state changes
        const {data: listener} = supabase.auth.onAuthStateChange((_, user) => {
            setUser(user);
        });

    }, []);

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
