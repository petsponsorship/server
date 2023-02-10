import * as postRepository from "../data/post.js";

export async function getPosts(_, res) {
  const posts = await postRepository.getAll();
  res.status(200).json(posts);
}

export async function getPost(req, res) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  if (post) res.status(200).json(post);
  else res.status(404).json({ message: `post id (${id}) not found` });
}

export async function createPost(req, res) {
  const { text } = req.body;
  const posts = await postRepository.create(text);
  res.status(201).json(posts);
}

export async function updatePost(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const post = await postRepository.update(id, text);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `post id (${id}) not found` });
  }
}

export async function removePost(req, res) {
  const id = req.params.id;
  await postRepository.remove(id);
  res.sendStatus(204);
}
