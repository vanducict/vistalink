import supabase from "../../app/lib/supabase";

export const getAllLinks = async () => {

    const {data: links, error} = await supabase
        .from('Link')
        .select('*');

    if (error) {
        console.log("Error fetching links:", error);
        return null;
    } else {
        console.log("success fetching links:", links);
        return links;
    }


}

