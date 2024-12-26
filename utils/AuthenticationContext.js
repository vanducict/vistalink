import React, {createContext, useContext, useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {firebase_auth} from "../FirebaseConfig";


const AuthContext = createContext(undefined);

export const useAuth = () => {
    return useContext(AuthContext);
};


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebase_auth, (user) => {
            setUser(user);
            setLoading(false); // Update loading state.
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;