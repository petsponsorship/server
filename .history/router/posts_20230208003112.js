import express from "express";

const posts = [
  {
    id: "1",
    text: "Hello",
    createdAt: Date.now().toString(),
  },
];
const router = express.Router();

router.get("/", (req, res, next) => {
  const data = posts;
  res.status(200).json(data);
});

export default router;
