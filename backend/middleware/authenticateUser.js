// authenticateUser is only needed posting 
// the login does not require backend 

import admin from '../firebaseAdmin.cjs';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(), 
    })
}

// CreatePage sends a req that contains the formdata and the firebase idToken to this middleware 
export const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization; // one of the fields of the giant req is headers 

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({success: false, message: "No token provided"});
    }

    const idToken = authHeader.split(' ')[1]; 
    // the long encoded string that hides all the information 
    
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken); 

        // appends all the user info, need to store the uid in database, tgt with all the formdata in the original req
        // to check if the uid of the owner of the post is the same as this current user 
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name, 
            avatar: decodedToken.picture,
        }
        console.log('Decoded token:', req.user);
        next();
        
    } catch (err) {
        console.error('Token verification failed:', err);
        return res.status(401).json({success: false, message: "Invalid token"})
    }
}