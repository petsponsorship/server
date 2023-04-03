import { sequelize } from "../db/database.js";

import SQ from "sequelize";
import { Post, updateSupport } from "./post.js";
import { findById, User } from "./auth.js";
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

export const Message = sequelize.define("message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  senderId: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  senderName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  senderEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  receiverId: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  receiverName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  receiverEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
});

export async function create(senderId, receiverId, message) {
  const sender = await findById(senderId);
  const receiver = await findById(receiverId);

  if (!receiver) throw new Error(`[${receiverId}] 는 존재하지 않는 아이디입니다.`);

  const { name: senderName, email: senderEmail } = sender.dataValues;
  const { name: receiverName, email: receiverEmail } = receiver.dataValues;

  return Message.create({
    message,
    senderId,
    senderName,
    senderEmail,
    receiverId,
    receiverName,
    receiverEmail,
  });
}

// 내가 보낸 리스트
export async function getBySenderId(senderId) {
  return Message.findAll({
    where: { senderId },
  });
}

// 내가 받은 리스트
export async function getByReceiverId(receiverId) {
  return Message.findAll({
    where: { receiverId },
  });
}
