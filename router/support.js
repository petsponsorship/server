import express from "express";
import { body } from "express-validator";
import * as supportController from "../controller/support.js";
import { isAuth } from "../middleware/auth.js";
import { validator } from "../middleware/validator.js";

const router = express.Router();
const validateSupport = [
  body("amount").trim().isLength({ min: 1 }).withMessage("공백은 금액이 될 수 없습니다."),
  validator,
];

router.get("/", isAuth, supportController.getSupport);
router.post("/", isAuth, validateSupport, supportController.createSupport);

export default router;
