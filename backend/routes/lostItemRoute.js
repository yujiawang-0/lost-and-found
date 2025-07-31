import express from 'express';
import {getLostItems, getLostItemById, postLostItem, getFilteredLostItems,
     updateLostItem, deleteLostItem, 
     getLostLocations} from '../controllers/lostItemController.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });


const router = express.Router();

router.get("/", getLostItems);

router.get("/filter", getFilteredLostItems);
router.get("/locations", getLostLocations);

router.get("/:id", getLostItemById);
router.post("/", upload.single('image'), postLostItem);

router.put("/:id", upload.single("image"), updateLostItem);
router.delete("/:id", deleteLostItem); 
// the "/"s are relative to where they are mounted 

export default router;