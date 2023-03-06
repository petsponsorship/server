import * as supportRepository from "../data/support.js";
import * as postRepository from "../data/post.js";
import * as likeRepository from "../data/like.js";
import * as authRepository from "../data/auth.js";

export async function getMypageInfo(req, res) {
  const userId = req.userId;
  const supportCnt = (await supportRepository.getById(userId)).length;
  const postCnt = (await postRepository.getAllByUser(userId)).length;
  const likeCnt = (await likeRepository.getByUser(userId)).length;
  const user = await authRepository.findById(userId);
  const userNmae = user.dataValues.name;
  const support = await supportRepository.getById(userId);
  const supportTotalAmount = support.reduce((sum, i) => sum + i.amount, 0);
  res.status(200).json({ userNmae, supportCnt, postCnt, likeCnt, supportTotalAmount });
}
