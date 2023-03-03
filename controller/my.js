import * as supportRepository from "../data/support.js";
import * as postRepository from "../data/post.js";
import * as likeRepository from "../data/like.js";

export async function getMypageInfo(req, res) {
  const userId = req.userId;
  const supportCnt = await (await supportRepository.getById(userId)).length;
  const postCnt = await (await postRepository.getAllByUser(userId)).length;
  const likeCnt = await (await likeRepository.getByUser(userId)).length;

  const support = await supportRepository.getById(userId);
  const supportTotalAmount = support.reduce((sum, i) => sum + i.amount, 0);
  res.status(200).json({ supportCnt, postCnt, likeCnt, supportTotalAmount });
}
