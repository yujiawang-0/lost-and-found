import { OAuth2Client } from "google-auth-library";
import User from '../models/user.model.js';
// part of the models u created 

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken =  async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // token it received from the frontend 
    // the credential field of CredentialResponse object

    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: token, 
            audience: process.env.GOOGLE_CLIENT_ID,
        }); 
        // checks if ID is valid 
        // ggl returns a Login Ticket 

        const payload = ticket.getPayload(); 
        // extracts decoded information from the Login Ticket
        const { email, name, picture} = payload;
        // pulls out these three fields from the payload object
        
        let user = await User.findOne({email});

        if (!user) {
            user = await User.create({
                email, 
                name, 
                avatar: picture,
            });
        }
        // create method is inbuilt
        // shortcut for const user = new User({ ... });
				//await user.save();

        req.user = user; 
        // attach user to the req.user
        
        next();

    } catch (err) {
        res.status(401).json({message: 'Invalid token'});
    }
};