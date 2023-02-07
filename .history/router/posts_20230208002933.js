import express from "express";

const posts = [
  {
    id: "1",
    text: "Hello",
    createdAt: Date.now().toString();
  },
];
const router = express.Router();

export default router;
