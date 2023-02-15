import { validationResult } from "express-validator";

export const validator = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) return next();
  else return res.status(400).json({ message: error.array()[0].msg });
};
