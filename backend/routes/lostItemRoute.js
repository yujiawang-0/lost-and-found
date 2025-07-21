import express from 'express';
import {getLostItems, getLostItemById, postLostItem, getFilteredLostItems,
     updateLostItem, deleteLostItem, 
     getLostLocations} from '../controllers/lostItemController.js';


const router = express.Router();

router.get("/", getLostItems);
router.get("/:id", getLostItemById);
router.post("/", upload.single('image'), postLostItem);
router.get("/filter", getFilteredLostItems);
router.get("/locations", getLostLocations);
router.put("/:id", updateLostItem);
router.delete("/:id", deleteLostItem); 
// the "/"s are relative to where they are mounted 

export default router;