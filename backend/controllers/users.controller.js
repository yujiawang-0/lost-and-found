import User from '../models/user.model.js';
import mongoose from "mongoose";

// res is the response the the backend sends back to the frontend 

export const createUser = async (req, res) => {
  const user = req.user; 
  // after backend runs the verifyGoogleToken 
  // and verified that the token (the CredentialResponse) is valid
  // verifyGoogleToken extracts the user info and add to req.user
   

  res.json({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  });
  // sends back the user info to the frontend 
};


 