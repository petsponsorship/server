import * as messageRepository from "../data/message.js";

export async function createMessage(req, res) {
  const { message, receiverId } = req.body;
  const senderId = req.userId;
  try {
    await messageRepository.create(senderId, receiverId, message);
    res.sendStatus(201);
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
}

export async function getMessages(req, res) {
  const userId = req.userId;
  try {
    const messages = await messageRepository.getByReceiverId(userId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
}

export async function getSendMessages(req, res) {
  const userId = req.userId;
  try {
    const messages = await messageRepository.getBySenderId(userId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
}
