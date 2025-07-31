import Item from '../models/item.model.js';
import mongoose from 'mongoose';


export const getLostItems = async (req, res) => {
    //res.status(200).send("you just fetched lost items");
    try {
        const items = await Item.find({status: 'lost'}).sort({ createdAt: -1 });
        res.status(200).json({success: true, data: items});
    } catch (error) {
        console.error("Error in getLostItems controller", error);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const getLostItemById = async (req, res) => {
    //res.status(200).send("you just fetched lost items");
    try {
        const item = await Item.findById(req.params.id);
        if(!item) return res.status(404).json({ message: "Note not found"})
        res.status(200).json({success: true, data: item});
    } catch (error) {
        console.error("Error in getLostItemById controller", error);
        res.status(500).json({success: false, message: "Server Error"});
    }
}


export const getFilteredLostItems = async (req, res) => {
    try {
        const query = {status: 'lost', ...req.query}; 
        const items = await Item.find(query);
        res.status(200).json({success: true, data: items});
        // here are the items u asked for, and the request worked 
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

// export const getLostLocations = async (req, res) => {
//     try {
//         const locations = await Item.distinct('location', {status:'lost'});
//         res.status(200).json({success: true, data: locations});
//     } catch (error) {
//         res.status(500).json({success: false, message: "Server Error"});
//     }
// }

export const getLostLocations = async (req, res) => {
    try {
        const locations = await Item.find({ status: 'lost' }).select('location -_id');

        // if locations are objects, extract their address strings
        const locationStrings = locations
        .map(item => {
            if (typeof item.location === 'string') return item.location;
            if (item.location?.address) return item.location.address;
            return null;
        })
        .filter(Boolean); // remove nulls

        const unique = [...new Set(locationStrings)];

        res.status(200).json({ success: true, data: unique });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const postLostItem = async (req, res) => {
    const item = req.body; // multer parse text fields into body
    const file = req.file; // multer will attach file to req.file

    // multer separates the text fields from the uploaded file 

    if(!item.name || !item.description) {
        return res.status(400).json({success: false, message: "Please provide required fields" });
    }

    const newItem = new Item({
        ...item, 
        image: file ? file.filename : null,
        user: req.user.id
    }); // creates item in backend
    // follow naming in the schema 

    try { 
        await newItem.save();
        res.status(201).json({success: true, data: newItem});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}



export const updateLostItem = async (req, res) => {
    const {id} = req.params;

    try {
        const updates = {...req.body};
        delete updates.status;
        const updatedItem = await Item.findByIdAndUpdate(id, updates, {new: true});
        if(!updatedItem) return res.status(404).json({success: false, message: "Invalid Item Id"});
        res.status(200).json({success: true, data: updatedItem});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const deleteLostItem = async (req, res) => {
    const {id} = req.params;
    
    try {
        const deletedItem = await Item.findByIdAndDelete(id); // need not send items back to frontend
        if(!deletedItem) return res.status(404).json({success: false, message: "Invalid Item Id"});
        res.status(200).json({success: true, message: "Product deleted"});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}
