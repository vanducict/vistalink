import supabase from "../../app/lib/supabase";
import * as FileSystem from "expo-file-system";
import {Buffer} from "buffer";


export const getAllLinks = async (eventType, searchQuery) => {
    let query = supabase.from('Link').select('*');

    // Filter by eventType if provided
    if (eventType) {
        query = query.eq('eventType', eventType);
    }

    // Filter by searchQuery across multiple fields if provided
    if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,ownerEmail.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
    }

    // Add conditions for closed and expired being false
    query = query.eq('closed', false).eq('expired', false);


    // Execute the combined query
    const {data: links, error} = await query;

    // Handle errors and return results
    if (error) {
        console.log("Error fetching links:", error);
        return null;
    }

    console.log("Successfully fetched links:", links);
    return links;
};


export const getAllLinksForUserConsumer = async (user) => {
    console.log(supabase.auth.getUser());
    const {data, error} = await supabase
        .from('Link')
        .select('*')
        .eq('ownerEmail', user.email);

    if (error) {
        console.log("Error fetching links for user:", error);
        return null;
    } else {
        return data;
    }
};

export const getAllLinksForId = async (id) => {
    console.log(id);
    const {data, error} = await supabase
        .from('Link')
        .select('*')
        .eq('id', id);

    if (error) {
        console.log("Error fetching links for user:", error);
        return null;
    } else {
        return data;
    }
};

export const updateLinkClosed = async (id, status) => {

    const {data, error} = await supabase
        .from('Link')
        .update({closed: status})
        .eq('id', id)
        .select()

    if (error) {
        console.log("Error updating Link:", error);
        return null;
    } else {
        console.log("Link updated successfully:", data);
        return data;
    }

};


export const getAllEventTypes = async () => {
    const {data, error} = await supabase
        .from('Link')
        .select('eventType')
        .eq("closed", false)  // Fetch all eventType values
        .eq("expired", false);  // Fetch all eventType values

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


export const getAllTypes = async () => {
    try {
        const {data, error} = await supabase.rpc('get_link_categories');

        if (error) {
            console.error("Error fetching link categories:", error.message || error);
            return null;
        }

        if (!Array.isArray(data)) {
            console.error("Unexpected data format:", data);
            return null;
        }

        console.log("Link categories fetched successfully:", data);
        return data;
    }
    catch (err) {
        console.error("Unexpected error occurred:", err);
        return null;
    }
};


export const createLink = async (name, description, date, location, startTime, endTime, eventType, maxPeople, ownerEmail) => {
    // Create the payload with all the provided fields
    const payload = {
        name,
        description,
        date,
        location,
        startTime,
        endTime,
        eventType,
        maxPeople,
        ownerEmail
    };

    // Perform the insert operation on the 'Link' table
    const {data, error} = await supabase
        .from('Link')
        .insert([payload])
        .select();

    if (error) {
        console.log("Error creating link:", error);
        return null;
    } else {
        console.log("Link created successfully:", data);
        return data;
    }
};


export const uploadImages = async (eventId, data) => {
    console.log(eventId);
    console.log(data);
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.log("No images to upload or invalid input.");
        return [];
    }

    try {
        const uploadedImagePaths = [];

        for (const imageUri of data) {
            if (typeof imageUri !== "string" || !imageUri.startsWith("file://")) {
                console.warn("Skipping invalid image URI:", imageUri);
                continue;
            }
            console.log("Processing image:", imageUri);
            // Convert image to Base64
            const base64 = await FileSystem.readAsStringAsync(imageUri, {encoding: "base64"});

            // Decode base64 to binary
            const imageBuffer = Buffer.from(base64, "base64");

            const fileType = imageUri.endsWith(".jpg") ? "jpg" : "png";
            const filePath = `${eventId}/${Date.now()}.${fileType}`;
            const contentType = fileType === "jpg" ? "image/jpeg" : "image/png";

            console.log("Uploading:", filePath);

            // Upload to Supabase
            const {data: uploadData, error} = await supabase.storage
                .from("linkImages")
                .upload(filePath, imageBuffer, {
                    contentType,
                    cacheControl: "3600",
                    upsert: true,
                });

            if (error) {
                console.error("Upload failed:", error.message);
            } else {
                console.log("Upload successful:", uploadData);
                uploadedImagePaths.push(uploadData.path);  // Use `path` instead of `Key`
            }
        }

        return uploadedImagePaths;
    }
    catch (error) {
        console.error("Error processing images:", error.message);
        return [];
    }
};


