import express from 'express';
import Item from '../models/item.model.js';
import { authorizeItemOwner } from '../middleware/authorizeItemOwner.js';
import { getUserItems, getItemById, updateItem, deleteItem } from '../controllers/userItems.controller.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/user', getUserItems);

router.get(
    '/:id', 
    authorizeItemOwner, 
    getItemById
);

router.put(
    '/:id',
    authorizeItemOwner, // attaches the specific item
    upload.single('image'),
    updateItem
);

router.delete(
    '/:id', 
    authorizeItemOwner, 
    upload.single('image'),
    deleteItem
)

export default router;