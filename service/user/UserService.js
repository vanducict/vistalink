import supabase from "../../app/lib/supabase";

// Function to insert a user with a given UID
const insertUser = async (uid) => {
    try {
        const {data, error} = await supabase
            .from('User')
            .insert([{uid}])  // Insert using the dynamic UID
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

export default insertUser;