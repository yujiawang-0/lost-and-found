import express from 'express';
import Item from '../models/item.model.js';
import { getUserItems, getItemById, updateItem, deleteItem } from '../controllers/userItems.controller.js';

const router = express.Router();

router.get('/user', getUserItems);

router.get(
    '/:id', 
    verifyGoogleToken, 
    authorizeItemOwner, 
    getItemById
);

router.put(
    '/:id',
    verifyGoogleToken, // attaches req.user
    authorizeItemOwner, // attaches the specific item
    upload.single('image'),
    updateItem
);

router.delete(
    '/:id', 
    verifyGoogleToken, 
    authorizeItemOwner, 
    upload.single('image'),
    deleteItem
)

export default router;