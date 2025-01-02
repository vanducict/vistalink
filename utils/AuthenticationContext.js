import React, {createContext, useContext, useEffect, useState} from "react";
import supabase from "../app/lib/supabase";

const AuthContext = createContext(undefined);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if there's an active session right away
        const fetchSession = async () => {
            const {data: {session}} = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);  // Set loading to false once session check is complete
        };

        // Fetch session on mount
        fetchSession().then(r => {
        });

        // Listen for auth state changes
        const {data: authListener} = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });
    }, []);

    if (loading) {
        // Optionally, render a loading spinner or null during the loading state.
        return null;  // Prevent rendering until session is checked
    }

    return (
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;