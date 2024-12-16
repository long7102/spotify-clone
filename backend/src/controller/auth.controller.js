import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body 
        
        // Use findOneAndUpdate with upsert to handle race conditions
        const user = await User.findOneAndUpdate(
            { clerkId: id }, 
            {
                $setOnInsert: {
                    clerkId: id,
                    fullName: `${firstName || ""} ${lastName || ""}`.trim(),
                    imageUrl,
                }
            },
            { 
                upsert: true,  // Create if not exists
                new: true,     // Return the modified document
                setDefaultsOnInsert: true // Apply default values if not specified
            }
        )
        
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.error('Authentication error:', error)
        
        // Ensure response is sent only once
        if (!res.headersSent) {
            res.status(500).json({ 
                success: false,
                message: "Authentication failed", 
                error: error.message 
            })
        }
    }
}