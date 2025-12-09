import express from "express";
import { generatePresentation } from "../controllers/aiController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/generate", verifyToken, generatePresentation);

export default router;
