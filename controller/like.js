import * as likeRepository from "../data/like.js";
import { updateLike } from "../data/post.js";

export async function getLike(req, res) {
  const userId = req.userId;
  const likeList = await likeRepository.getByUser(userId);
  res.status(200).json(likeList);
}

export async function like(req, res) {
  const { postId } = req.body;
  const userId = req.userId;
  const result = await likeRepository.like(postId, userId);
  const likeNum = await likeRepository.getByPost(postId);
  await updateLike(postId, likeNum.rows.length);
  if (result) return res.sendStatus(201);
  else res.sendStatus(204);
}
