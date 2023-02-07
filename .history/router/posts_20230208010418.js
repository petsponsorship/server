import express from "express";
import "express-async-errors";

let posts = [
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

router.post("/", (req, res, next) => {
  const { text } = req.body;
  const post = {
    id: Date.now().toString(),
    text,
    createdAt: Date.now().toString(),
  };
  posts = [post, ...posts];
  res.status(201).json(posts);
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.text = text;
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `post id (${id}) not found` });
  }
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  posts = posts.filter((post) => post.id !== id);
  res.sendStatus(204);
});

export default router;
