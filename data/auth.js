import { sequelize } from "../db/database.js";

import SQ from "sequelize";
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

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
