import supabase from "../../app/lib/supabase";

export const insertUser = async (user, email, name, firstName, birthdate) => {
    try {
        const {data, error} = await supabase
            .from('User')
            .insert([
                {
                    uid: user.uid,
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
    const {data: user, error} = await supabase
        .from('User')
        .select('*')
    if (error) {
        console.log("Error fetching user:", error);
        return null;
    }

    return user;
}



