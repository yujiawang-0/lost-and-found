import express from 'express';
import { getFoundItems, getFoundItemById, postFoundItem, getFilteredFoundItems, updateFoundItem, deleteFoundItem } from '../controllers/foundItemController.js';
import multer from 'multer';
import { authenticateUser } from '../middleware/authenticateUser.js';
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get("/", getFoundItems);
router.get("/:id", getFoundItemById);
router.post("/", authenticateUser, upload.single('image'), postFoundItem);
router.get("/filter", getFilteredFoundItems);
router.put("/:id", updateFoundItem);
router.delete("/:id", deleteFoundItem);

export default router;