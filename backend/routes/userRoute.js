import express from "express";
import { createUser, updateUserInfo } from "../controllers/users.controller";

const router = express.Router();

router.post("/", createUser); 
router.put("/:id", updateUserInfo);

export default router;