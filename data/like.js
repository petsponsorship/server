import { sequelize } from "../db/database.js";

import SQ from "sequelize";
import { Post } from "./post.js";
import { User } from "./auth.js";
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

export const Like = sequelize.define(
  "like",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  { timestamps: false }
);
Like.belongsTo(Post);
Like.belongsTo(User);

export async function getByPostByUser(postId, userId) {
  return Like.findOne({
    where: { postId, userId },
  });
}

export async function getByPost(postId) {
  return Like.findAndCountAll({
    where: { postId },
  });
}

export async function getByUser(userId) {
  return Like.findAll({
    attributes: [
      [Sequelize.col("post.id"), "postId"],
      [Sequelize.col("post.species"), "species"],
      [Sequelize.col("post.speciesDetail"), "speciesDetail"],
      [Sequelize.col("post.name"), "name"],
      [Sequelize.col("post.etcDetail"), "etcDetail"],
      [Sequelize.col("post.sex"), "sex"],
      [Sequelize.col("post.age"), "age"],
      [Sequelize.col("post.targetAmount"), "targetAmount"],
      [Sequelize.col("post.amount"), "amountByPost"],
      [Sequelize.col("post.adopt"), "adopt"],
      [Sequelize.col("post.purpose"), "purpose"],
      [Sequelize.col("post.thumbnail"), "thumbnail"],
      [Sequelize.col("post.sponsor"), "sponsor"],
    ],
    where: { userId },
    include: { model: Post, attributes: [] },
  });
}

export async function like(postId, userId) {
  const like = await getByPostByUser(postId, userId);
  if (like) return unlike(like.dataValues.id);
  return Like.create({
    postId,
    userId,
  });
}

export async function unlike(id) {
  return Like.findByPk(id).then((like) => {
    like.destroy();
  });
}

export async function getByPostById(postId, userId) {
  return Like.findOne({
    where: { postId, userId },
  });
}
