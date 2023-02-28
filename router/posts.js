import express from "express";
import { body } from "express-validator";
import * as postController from "../controller/post.js";
import { isAuth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
import { validator } from "../middleware/validator.js";

const router = express.Router();

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.post("/", isAuth, validator, upload.single("thumbnail"), postController.createPost);
router.put("/:id", isAuth, validator, postController.updatePost);
router.put("/end/:id", isAuth, postController.endPost);
router.post("/img", isAuth, upload.single("img"), postController.img);
router.delete("/:id", isAuth, postController.removePost);

export default router;
