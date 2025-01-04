import supabase from "../../app/lib/supabase";

export const createUserLink = async (linkId, userEmail) => {
    const payload = {
        linkId,
        userEmail
    };

    const {data, error} = await supabase
        .from('UserLink')
        .insert([payload])
        .select();

    if (error) {
        console.log("Error creating UserLink:", error);
        return null;
    } else {
        console.log("UserLink created successfully:", data);
        return data;
    }
};

export const getUserLinksForId = async (linkId) => {
    const {data, error} = await supabase
        .from('UserLink')
        .select('*') // Adjust columns as necessary
        .eq('linkId', linkId); // Filter by linkId

    if (error) {
        console.log("Error fetching UserLinks:", error);
        return null;
    } else {
        console.log("UserLinks fetched successfully:", data);
        return data;
    }
};





          