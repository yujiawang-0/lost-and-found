import express from 'express';
import { getFoundItems, getFoundItemById, postFoundItem, getFilteredFoundItems, updateFoundItem, deleteFoundItem } from '../controllers/foundItemController.js';


const router = express.Router();

router.get("/", getFoundItems);
router.get("/:id", getFoundItemById);
router.post("/", postFoundItem);
router.get("/filter", getFilteredFoundItems);
router.put("/:id", updateFoundItem);
router.delete("/:id", deleteFoundItem);

export default router;