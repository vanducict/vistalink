import supabase from "../../app/lib/supabase";

export const getAllLinks = async (eventType, searchQuery) => {
    let query = supabase.from('Link').select('*');

    // If eventType is provided, filter by eventType
    if (eventType) {
        query = query.eq('eventType', eventType);
    }

    if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,ownerEmail.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
    }
    
    // Execute the query
    const {data: links, error} = await query;

    // Handle errors and return results
    if (error) {
        console.log("Error fetching links:", error);
        return null;
    }

    console.log("Successfully fetched links:", links);
    return links;
};


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