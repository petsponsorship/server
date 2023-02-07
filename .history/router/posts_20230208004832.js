import express from "express";
import "express-async-errors";

const posts = [
  {
    id: "1",
    text: "Hello",
    createdAt: Date.now().toString(),
  },
  {
    id: "2",
    text: "Hello2",
    createdAt: Date.now().toString(),
  },
];
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json(posts);
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id === id);
  if (post) res.status(200).json(post);
  else res.status(404).json({ message: `post id (${id}) not found` });
});

export default router;
