import Item from '../models/item.model.js';
import mongoose from 'mongoose';

export const getLostItems = async (req, res) => {
    try {
        const items = await Item.find({status: 'lost'});
        res.status(200).json({success: true, data: items});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const getFoundItems = async (req, res) => {
    try {
        const items = await Item.find({status: 'lost'});
        res.status(200).json({success: true, data: items});
    } catch (error) {
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

export const getFilteredFoundItems = async (req, res) => {
    try {
        const query = {status: 'found', ...req.query}; 
        const items = await Item.find(query);
        res.status(200).json({success: true, data: items});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const postItem = async (req, res) => {
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

export const updateItem = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }

    try {
        const updates = {...req.body};
        delete update.status;
        const updatedItem = await Item.findByIdAndUpdate(id, update, {new: true});
        res.status(200).json({success: true, data: updatedItem});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const deleteItem = async (req, res) => {
    const {id} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }

    try {
        await Product.findByIdAndDelete(id); // need not send items back to frontend
        res.status(200).json({success: true, message: "Product deleted"});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}
