import Item from '../models/item.model.js';
import mongoose from 'mongoose';


export const getFoundItems = async (req, res) => {
    //res.status(200).send("you just fetched found items");
    try {
        const items = await Item.find({status: 'found'}).sort({ createdAt: -1 }); // -1 will sort in desc. order (newest first)
        res.status(200).json({success: true, data: items});
    } catch (error) {
        console.error("Error in getFoundItems controller");
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}


export const getFoundItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if(!item) return res.status(404).json({ message: "Note not found"})
        res.status(200).json({success: true, data: item});
    } catch (error) {
        console.error("Error in getFoundItemById controller", error);
        res.status(500).json({success: false, message: "Server Error"});
    }
}


export const getFilteredFoundItems = async (req, res) => {
    try {
        const query = {status: 'found', ...req.query}; 
        const items = await Item.find(query);
        res.status(200).json({success: true, data: items});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}


export const postFoundItem = async (req, res) => {
    const item = req.body;

    if(!item.name || !item.description) {
        return res.status(400).json({success: false, message: "Please provide required fields" });
    }

    const newItem = new Item(item); // creates item in backend

    try { 
        await newItem.save();
        res.status(201).json({success: true, data: newItem});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const updateFoundItem = async (req, res) => {
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

export const deleteFoundItem = async (req, res) => {
    const {id} = req.params;
    
    try {
        const deletedItem = await Item.findByIdAndDelete(id); // need not send items back to frontend
        if(!deletedItem) return res.status(404).json({success: false, message: "Invalid Item Id"});
        res.status(200).json({success: true, message: "Item deleted"});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}
