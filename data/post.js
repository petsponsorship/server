import SQ from "sequelize";
import dayjs from "dayjs";
import { User } from "./auth.js";
import { sequelize } from "../db/database.js";
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
  expiredDesc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  like: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  expiredAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => {
      const today = dayjs();
      const expiredAt = today.add(13, "day");
      return expiredAt.$d;
    },
  },
});
Post.belongsTo(User);

export async function getAll(species) {
  return Post.findAll({
    attributes: [
      "id",
      "species",
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
      "expiredDesc",
      "createdAt",
      "expiredAt",
    ],
    order: [["createdAt", "DESC"]],
    raw: true,
    where: species === "전체" || species === "" ? "" : { species },
  });
}

export async function getAllByUser(userId) {
  return Post.findAll({
    attributes: [
      "id",
      "species",
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
      "expiredDesc",
      "createdAt",
      "expiredAt",
    ],
    order: [["createdAt", "DESC"]],
    raw: true,
    where: { userId },
  });
}

export async function getById(id) {
  return Post.findOne({
    where: { id },
  });
}

export async function create(
  species,
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
  const updateSupportExpired = Post.findByPk(id).then((post) => {
    post.expired = true;
    post.expiredDesc = "amount";
    return post.save();
  });
  return Post.findByPk(id).then((post) => {
    if (post.targetAmount === amount) {
      updateSupportExpired;
    }
    if (post.targetAmount <= post.amount) {
      updateSupportExpired;
      throw new Error("목표 후원 금액을 달성했습니다.");
    }
    post.amount = amount;
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

export async function updateExpired() {
  const notExpiredPosts = await getAll("");
  const filtered = notExpiredPosts.filter((post) => post.expired === 0); // 만료가 되지 않았다면,
  const today = dayjs();
  filtered.map((post) => {
    const postDate = dayjs(post.createdAt);
    if (Math.abs(postDate.diff(today, "d")) > 13) {
      return Post.findByPk(post.id).then((post) => {
        post.expired = true;
        post.expiredDesc = "date";
        return post.save();
      });
    } else return;
  });
}

export async function updateExpiredEnd(id) {
  return Post.findByPk(id).then((post) => {
    post.expired = true;
    post.expiredDesc = "changedMind";
    return post.save();
  });
}
