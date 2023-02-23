import express from "express";
import { body } from "express-validator";
import * as postController from "../controller/post.js";
import { isAuth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
import { validator } from "../middleware/validator.js";

const router = express.Router();
const validatePost = [
  // body("name").trim().isLength({ min: 1 }).withMessage("공백은 이름이 될 수 없습니다.?"),
  // body("age").trim().isLength({ min: 1 }).withMessage("공백은 나이가 될 수 없습니다."),
  // body("targetAmount").trim().isLength({ min: 1 }).withMessage("공백은 금액이 될 수 없습니다."),
  validator,
];

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.post("/", isAuth, validatePost, upload.single("thumbnail"), postController.createPost);
router.put("/:id", isAuth, validatePost, postController.updatePost);
router.delete("/:id", isAuth, postController.removePost);

export default router;
