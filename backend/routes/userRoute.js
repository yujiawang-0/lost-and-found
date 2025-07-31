import express from 'express';
import { verifyGoogleToken } from '../middleware/verifyGoogleToken.js';
import { createUser } from '../controllers/users.controller.js';

const router = express.Router();

router.post('/auth/google', verifyGoogleToken, createUser);
// backend runs verifyGoogleToken first
// if token is valid, user info is extracted 
// and then added to req.user
// then createUser runs, sending back the user info 


export default router;