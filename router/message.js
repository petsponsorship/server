import express from "express";
import * as messageController from "../controller/message.js";
import { isAuth } from "../middleware/auth.js";
const router = express.Router();

router.post("/", isAuth, messageController.createMessage);
router.get("/", isAuth, messageController.getMessages);
router.get("/my", isAuth, messageController.getSendMessages);

export default router;
