import supabase from "../../app/lib/supabase";

export const insertUser = async (user, email, name, firstName, birthdate) => {
    try {
        const {data, error} = await supabase
            .from('User')
            .insert([
                {
                    email: email,
                    name: name,
                    firstName: firstName,
                    birthDate: birthdate
                },
            ])
            .select();
        if (error) {
            console.error("Error inserting user:", error.message);
            return {success: false, error: error.message};
        } else {
            console.log("User inserted successfully:", data);
            return {success: true, data};
        }
    } catch (e) {
        console.error("Unexpected error:", e);
        return {success: false, error: e.message};
    }
};


export const getCurrentUser = async () => {
    try {

        const {data: {session}, error: sessionError} = await supabase.auth.getSession();

        if (sessionError) {
            console.error("Error fetching session:", sessionError);
            return null;
        }
        
        if (!session?.user) {
            console.log("No active session found");
            return null;
        }


        const {data: user, error: userError} = await supabase
            .from('User')
            .select('*')
            .eq('email', session.user.email);

        // If there's an error fetching user data
        if (userError) {
            console.error("Error fetching user data:", userError);
            return null;
        }

        return user;
    } catch (e) {
        console.error("Unexpected error:", e);
        return null;
    }
}



