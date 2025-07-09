import express from 'express';
import {getLostItems, getFoundItems, getFilteredLostItems, getFilteredFoundItems,
     updateItem, deleteItem } from '../controllers/product.controller.js';


const router = express.Router();

router.get("/lost", getLostItems);
router.get("/found", getFoundItems);

router.get("/lost/filter", getFilteredLostItems);
router.get("/found/filter", getFilteredFoundItems);

router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;