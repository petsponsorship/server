import express from "express";
import * as postController from "../controller/post.js";
import { isAuth } from "../middleware/auth.js";
import { validator } from "../middleware/validator.js";

const router = express.Router();

router.post("/", isAuth, validator, postController.updatePost);

export default router;
