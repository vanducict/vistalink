import supabase from "../../app/lib/supabase";

export const getAllLinks = async (eventType) => {
    console.log("--------------------" + eventType)
    if (!eventType) {
        const {data: links, error} = await supabase
            .from('Link')
            .select('*')
        if (error) {
            console.log("Error fetching links:", error);
            return null;
        } else {
            console.log("success fetching links:", links);
            return links;
        }
    } else {
        const {data: links, error} = await supabase
            .from('Link')
            .select('*')
            .eq('eventType', eventType)
        if (error) {
            console.log("Error fetching links:", error);
            return null;
        } else {
            console.log("success fetching links:", links);
            return links;
        }
    }

}


export const getAllEventTypes = async () => {
    const {data, error} = await supabase
        .from('Link')
        .select('eventType');  // Fetch all eventType values

    if (error) {
        console.log("Error fetching event types:", error);
        return null;
    } else {
        // Extract event types and filter out duplicates
        const uniqueEventTypes = [...new Set(data.map(item => item.eventType))];
        console.log("Unique event types:", uniqueEventTypes);
        return uniqueEventTypes;
    }
};