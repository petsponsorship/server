import express from "express";
import { body } from "express-validator";
import * as likeController from "../controller/like.js";
import { isAuth } from "../middleware/auth.js";
import { validator } from "../middleware/validator.js";

const router = express.Router();
const validateLike = [
  body("postId").trim().isLength({ min: 1 }).withMessage("공백은 게시글 아이디가 될 수 없습니다."),
  validator,
];

router.get("/", isAuth, likeController.getLike);
router.post("/", isAuth, validateLike, likeController.like);

export default router;
