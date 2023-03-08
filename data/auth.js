import { sequelize } from "../db/database.js";
import SQ from "sequelize";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const AUTH_ERROR = { message: "Authentication Error" };

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export async function findByEmail(email) {
  return User.findOne({
    where: { email },
  });
}

export async function findById(id) {
  return User.findOne({
    where: { id },
  });
}

export async function createUser(email, name, phoneNumber, password) {
  return User.create(email, name, phoneNumber, password);
}

export async function findByToken(authToken) {
  const token = authToken.split(" ")[1];
  let userId = "";
  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) throw new Error(`token 이 유효하지 않습니다.`);
    userId = decoded.id;
  });
  return userId;
}

export async function createRefreshToken(id, refreshToken) {
  return User.findByPk(id).then((user) => {
    user.refreshToken = refreshToken;
    return user.save();
  });
}

export async function removeRefreshToken(id) {
  return User.findByPk(id).then((user) => {
    user.refreshToken = "";
    return user.save();
  });
}

export async function findByRefreshToken(refreshToken) {
  const vaildUser = User.findOne({
    where: { refreshToken },
  });
  if (vaildUser) return findByToken(refreshToken);
}
