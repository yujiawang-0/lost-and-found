import express from 'express';
import {getLostItems, getLostItemById, postLostItem, getFilteredLostItems,
     updateLostItem, deleteLostItem } from '../controllers/lostItemController.js';


const router = express.Router();

router.get("/", getLostItems);
router.get("/:id", getLostItemById);
router.post("/", postLostItem);
router.get("/filter", getFilteredLostItems);
router.put("/:id", updateLostItem);
router.delete("/:id", deleteLostItem);

export default router;