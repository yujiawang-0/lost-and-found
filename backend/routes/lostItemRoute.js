import express from 'express';
import {getLostItems, getLostItemById, postLostItem, getFilteredLostItems,
     updateLostItem, deleteLostItem } from '../controllers/lostItemController.js';


const router = express.Router();

router.get("/", getLostItems);
router.get("/:id", getLostItemById);
router.post("/", upload.single('image'), postLostItem);
router.get("/filter", getFilteredLostItems);
router.put("/:id", updateLostItem);
router.delete("/:id", deleteLostItem); 
// the "/"s are relative to where they are mounted 

export default router;