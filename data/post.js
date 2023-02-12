import { sequelize } from "../db/database.js";

import SQ from "sequelize";
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

export const Post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export async function getAll() {
  return Post.findAll({
    order: [["createdAt", "DESC"]],
  });
}

export async function getById(id) {
  return Post.findOne({
    where: { id },
  });
}

export async function create(text) {
  return Post.create({ text }).then((data) => getById(data.dataValues.id));
}

export async function update(id, text) {
  return Post.findByPk(id).then((post) => {
    post.text = text;
    return post.save();
  });
}

export async function remove(id) {
  return Post.findByPk(id).then((post) => {
    post.destroy();
  });
}
