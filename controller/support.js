import * as suppotRepository from "../data/support.js";

export async function getSupport(req, res) {
  const userId = req.userId;
  const support = await suppotRepository.getById(userId);
  const supportTotalAmount = support.reduce((sum, i) => sum + i.amount, 0);
  res.status(200).json({ total: supportTotalAmount, supportList: support });
}

export async function createSupport(req, res) {
  const { amount } = req.body;
  const userId = req.userId;
  const postId = req.params.id;
  await suppotRepository.create(Number(amount), postId, userId);
  res.sendStatus(201);
}
