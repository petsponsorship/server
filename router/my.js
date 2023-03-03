import express from "express";
import * as myController from "../controller/my.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isAuth, myController.getMypageInfo);

export default router;
