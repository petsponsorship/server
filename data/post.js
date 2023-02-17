import { sequelize } from "../db/database.js";

import SQ from "sequelize";
import { User } from "./auth.js";
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

export const Post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "etc",
  },
  speciesDetail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  etcDetail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sex: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "무명",
  },
  age: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  neutered: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  targetAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  adopt: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  sponsor: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  purpose: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "medical",
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "",
  },
  expired: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  like: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
Post.belongsTo(User);

export async function getAll(species) {
  return Post.findAll({
    attributes: [
      "id",
      "species",
      "speciesDetail",
      "name",
      "etcDetail",
      "sex",
      "age",
      "targetAmount",
      "amount",
      "adopt",
      "purpose",
      "thumbnail",
      "sponsor",
      "expired",
    ],
    order: [["createdAt", "DESC"]],
    raw: true,
    where: species ? { species } : "",
  });
}

export async function getById(id) {
  return Post.findOne({
    where: { id },
  });
}

export async function create(
  species,
  speciesDetail,
  etcDetail,
  sex,
  name,
  age,
  targetAmount,
  adopt,
  purpose,
  thumbnail,
  content,
  userId
) {
  return Post.create({
    species,
    speciesDetail,
    etcDetail,
    sex,
    name,
    age,
    targetAmount,
    adopt,
    purpose,
    thumbnail,
    content,
    userId,
  }).then((data) => getById(data.dataValues.id));
}

export async function update(
  id,
  species,
  speciesDetail,
  etcDetail,
  sex,
  name,
  age,
  adopt,
  purpose,
  thumbnail,
  content
) {
  return Post.findByPk(id).then((post) => {
    post.species = species;
    post.speciesDetail = speciesDetail;
    post.etcDetail = etcDetail;
    post.sex = sex;
    post.name = name;
    post.age = age;
    post.adopt = adopt;
    post.purpose = purpose;
    post.thumbnail = thumbnail;
    post.content = content;
    return post.save();
  });
}

export async function remove(id) {
  return Post.findByPk(id).then((post) => {
    post.destroy();
  });
}

export async function updateSupport(id, amount) {
  return Post.findByPk(id).then((post) => {
    post.amount = post.amount + amount;
    return post.save();
  });
}

export async function updateLike(id, like) {
  return Post.findByPk(id).then((post) => {
    post.like = like;
    return post.save();
  });
}

export async function updateSponsor(id, sponsor) {
  return Post.findByPk(id).then((post) => {
    post.sponsor = sponsor;
    return post.save();
  });
}
