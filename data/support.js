import { sequelize } from "../db/database.js";

import SQ from "sequelize";
import { Post, updateSupport } from "./post.js";
import { User } from "./auth.js";
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

export const Support = sequelize.define(
  "support",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { timestamps: false }
);
Support.belongsTo(Post);
Support.belongsTo(User);

export async function getById(userId) {
  return Support.findAll({
    attributes: [
      "amount",
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
    include: { model: Post, attributes: [] },
    where: { userId },
  });
}

export async function getByPostById(postId, userId) {
  return Support.findOne({
    where: { postId, userId },
  });
}

export async function getByPost(postId) {
  return Support.findAndCountAll({
    where: { postId },
  });
}

export async function create(amount, postId, userId) {
  const support = await getByPostById(postId, userId);
  if (support) return update(support, postId, amount);
  await updateSupport(postId, amount);
  return Support.create({
    amount,
    postId,
    userId,
  });
}

export async function update(support, postId, amount) {
  const id = support.dataValues.id;
  const prevAmount = support.dataValues.amount;
  await updateSupport(postId, prevAmount + amount);
  return Support.findByPk(id).then((support) => {
    support.amount = prevAmount + amount;
    return support.save();
  });
}
