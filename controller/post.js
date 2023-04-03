import { findByToken } from "../data/auth.js";
import * as postRepository from "../data/post.js";
import * as supportRepository from "../data/support.js";
import * as likeRepository from "../data/like.js";

export async function getPosts(req, res) {
  // postRepository.updateExpired();
  const species = req.query.species;
  const lastId = req.query.lastId;
  const userId = req.query.user;
  if (userId) {
    const posts = await postRepository.getAllByUser(userId);
    res.status(200).json(posts);
  } else {
    const posts = await postRepository.getAll(species, lastId);
    res.status(200).json(posts);
  }
}

export async function getPost(req, res) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  const authHeader = req.get("Authorization");
  if (authHeader && post) {
    const userId = await findByToken(authHeader);
    const supportByUser = await supportRepository.getByPostById(id, userId);
    const supportAmountByUser = (supportByUser && supportByUser.dataValues.amount) || 0;
    const likeByUser = await likeRepository.getByPostById(id, userId);
    const isLike = likeByUser ? true : false;
    return res.status(200).json({ supportAmountByUser, isLike, post });
  } else if (post) return res.status(200).json({ supportAmountByUser: 0, isLike: false, post });
  res.status(404).json({ message: `post id (${id}) not found` });
}

export async function createPost(req, res) {
  const {
    species,
    etcDetail,
    sex,
    name,
    age,
    neutered,
    targetAmount,
    adopt,
    purpose,
    content,
    thumbnail,
  } = req.body;
  const userId = req.userId;
  // const thumbnail = req.file ? req.file.location : "";

  const posts = await postRepository.create(
    species,
    etcDetail,
    sex,
    name,
    age,
    neutered,
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

  const { species, etcDetail, sex, name, age, neutered, adopt, purpose, thumbnail, content } =
    req.body;

  const post = await postRepository.getById(id);
  if (!post) return res.status(404).json({ message: `post id (${id}) not found` });
  if (post.userId !== req.userId) return res.sendStatus(403);

  const updated = await postRepository.update(
    id,
    species,
    etcDetail,
    sex,
    name,
    age,
    neutered,
    adopt,
    purpose,
    thumbnail,
    content
  );
  res.status(200).json(updated);
  res.status(200);
}

export async function removePost(req, res) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  const data = await supportRepository.getByPost(id);

  if (!post) return res.status(404).json({ message: `post id (${id}) not found` });
  if (post.userId !== req.userId) return res.sendStatus(403);

  if (data.count === 0) {
    await postRepository.remove(id);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: `post id (${id}) 는 현재 후원자가 존재하는 글입니다.` });
  }
}

export async function endPost(req, res) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  if (!post) return res.status(404).json({ message: `post id (${id}) not found` });
  if (post.userId !== req.userId) return res.sendStatus(403);

  const updated = await postRepository.updateExpiredEnd(id);
  res.status(200).json(updated);
}

export async function img(req, res) {
  const img = req.file ? req.file.location : "";
  res.status(200).json({ imgUrl: img });
}
