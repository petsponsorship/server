import { findByToken } from "../data/auth.js";
import * as postRepository from "../data/post.js";
import * as supportRepository from "../data/support.js";

import { isAuth } from "../middleware/auth.js";

export async function getPosts(req, res) {
  const species = req.query.species;
  const posts = await postRepository.getAll(species);
  res.status(200).json(posts);
}

export async function getPost(req, res, next) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  const authHeader = req.get("Authorization");
  if (authHeader && post) {
    const userId = await findByToken(authHeader);
    const supportByUser = await supportRepository.getByPostById(id, userId);
    const supportAmountByUser = supportByUser?.dataValues.amount || 0;
    return res.status(200).json({ supportAmountByUser, post });
  } else if (post) return res.status(200).json(post);
  res.status(404).json({ message: `post id (${id}) not found` });
}

export async function createPost(req, res) {
  const {
    species,
    speciesDetail,
    etcDetail,
    sex,
    name,
    age,
    targetAmount,
    adopt,
    purpose,
    thumbnail,
    content,
  } = req.body;
  const userId = req.userId;
  const posts = await postRepository.create(
    species,
    speciesDetail,
    etcDetail,
    sex,
    name,
    age,
    targetAmount,
    adopt,
    purpose,
    thumbnail,
    content,
    userId
  );
  res.status(201).json(posts);
}

export async function updatePost(req, res) {
  const id = req.params.id;

  const { species, speciesDetail, etcDetail, sex, name, age, adopt, purpose, thumbnail, content } =
    req.body;

  const post = await postRepository.getById(id);
  if (!post) return res.status(404).json({ message: `post id (${id}) not found` });
  if (post.userId !== req.userId) return res.sendStatus(403);

  const updated = await postRepository.update(
    id,
    species,
    speciesDetail,
    etcDetail,
    sex,
    name,
    age,
    adopt,
    purpose,
    thumbnail,
    content
  );
  res.status(200).json(updated);
}

export async function removePost(req, res) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  if (!post) return res.status(404).json({ message: `post id (${id}) not found` });
  if (post.userId !== req.userId) return res.sendStatus(403);
  await postRepository.remove(id);
  res.sendStatus(204);
}
