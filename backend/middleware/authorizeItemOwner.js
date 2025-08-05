import Item from "../models/item.model.js";

export const authorizeItemOwner = async (req, res, next) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({success: false, message: "Unauthotrized"});
        }

        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).status({success: false, message: "Item not found"});
        }
        /* req = {
            params: {
                id: 'abc123' // from the route URL like /items/abc123
            },
            body: {
                name: 'Water Bottle',
                description: 'Blue bottle left in library',
                // other fields from POST/PUT
            },
            user: {
                email: 'example@gmail.com',
                name: 'Jane Doe',
                uid: 'firebase-uid-123',
                // set by Firebase authentication middleware
            },
            file: {
                filename: 'waterbottle.jpg',
                // from multer if you’re uploading files
            },
            query: {
                // if request was like ?search=bottle, this will be { search: 'bottle' }
            },
            headers: {
                authorization: 'Bearer <firebase-id-token>',
                'content-type': 'application/json',
            },
            method: 'POST', 
            url: '/items/abc123',
            originalUrl: '/items/abc123',
        } */

            // boolean to check if the item's uid (attached when item gets created)
            // is the same the user's
            const isOwner = item.uid === req.user.uid;
            if (!isOwner) {
                return res.status(403).json({success: false, message: "Forbidden: Not the owner of the item"});
            }
            
            // attach item to request for downstream middleware 
            req.item = item;
            next();

    } catch (err) {
        return res.status(500).json({success: false, message: "Server Error"});
    }
}