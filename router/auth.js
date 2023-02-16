import express from "express";
import { body } from "express-validator";
import * as authController from "../controller/auth.js";
import { isAuth } from "../middleware/auth.js";
import { validator } from "../middleware/validator.js";

const router = express.Router();

const validateCredential = [
  body("email").trim().isEmail().withMessage("이메일 형식이 맞지 않습니다."),
  body("password").trim().isLength({ min: 8 }).withMessage("비밀번호는 8자리 이상이어야 합니다."),
  validator,
];

const vaildateSignup = [
  ...validateCredential,
  body("name").trim().isLength({ min: 2 }).withMessage("이름은 2글자 이상이어야 합니다."),
  body("phoneNumber")
    .trim()
    .isLength({ min: 10 })
    .withMessage("전화번호는 10글자 이상이어야 합니다."),
  validator,
];

router.post("/login", validateCredential, authController.login);
router.post("/signup", vaildateSignup, authController.signup);
router.get("/me", isAuth, authController.me);

export default router;
