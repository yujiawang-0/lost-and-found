import Item from "../models/item.model";

export const authorizeItemOwner = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({success:false, message: 'Unauthorised'});
        }
        const item = await Item.findById(req.params.id); // find the item by id
        if (!item) {
            return res.status(404).json({success: false, message: 'Item not found'});
        }

        const isOwnerByEmail = item.email && req.user.email && item.email === req.user.email;
        if (!isOwnerByEmail) {
            return res.status(403).json({success: false, message: 'Forbidden'});
        }

        req.item = item; // attach the fetched item to the request 
        next();
    } catch (err) {
        return res.status(500).json({success:false, message: 'Server Error'})
    }
};