import User from '../models/user.model.js';
import mongoose from "mongoose";

// res is the response the the backend sends back to the frontend 
export const createUser = async (req, res) => {
    const {name, contact, password} = req.body;

    if (!use.name || !user.contact || !user.password) {
        return res.status(400).json({success: false, message: "Please provide required fields"});
    }

    try { 
        const existingUser = await User.findOne({name});

        if (existingUser) {
            return res.status(400).json({message: "Username already taken"});
        }

        const newUser = new User({name, contact, password});
        await newUser.save();
        res.status(201).json({success: true, data: newUser}) // return to frontend so frontend can access the unique id of the user
    } catch (error) {
        res.status(500).json({sucess: false, message: "Server Error"});
    }

}

export const updateUserInfo = async (req, res) => {
    const {id} = req.params;

    const userInfo = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid User ID"});
    }

    try { 
        const updatedUserInfo = await User.findByIdAndUpdate(id, userInfo, {new:true})
        res.status(200).json({success: true, data: updatedUserInfo});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}



 