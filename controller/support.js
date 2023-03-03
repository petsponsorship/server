import { updateSponsor } from "../data/post.js";
import * as supportRepository from "../data/support.js";

export async function getSupport(req, res) {
  const userId = req.userId;
  const supportList = await supportRepository.getById(userId);
  res.status(200).json({ supportList });
}

export async function createSupport(req, res) {
  const { postId, amount } = req.body;
  const userId = req.userId;
  try {
    await supportRepository.create(Number(amount), postId, userId);
    const supportNum = await supportRepository.getByPost(postId);
    await updateSponsor(postId, supportNum.rows.length);
    res.sendStatus(201);
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
}
