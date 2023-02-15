import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../data/auth.js";
import { config } from "../config.js";

const jwtExpiresInDays = "2d";

const { secretKey, saltRound } = config.jwt;

export async function signup(req, res) {
  const { email, name, phoneNumber, password } = req.body;
  const found = await userRepository.findByEmail(email);
  if (found) return res.status(409).json({ message: `${email} 은 이미 존재하는 이메일입니다.` });
  const hashed = await bcrypt.hash(password, Number(saltRound));
  const userId = await userRepository.createUser({
    email,
    name,
    phoneNumber,
    password: hashed,
  });
  const token = createJwtToken(userId.dataValues.id);
  res.status(201).json({ token: `Bearer ${token}`, email, name, userId: userId.dataValues.id });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await userRepository.findByEmail(email);
  if (!user) return res.status(401).json({ message: "이메일 혹은 비밀번호가 맞지 않습니다." });
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    return res.status(401).json({ message: "이메일 혹은 비밀번호가 맞지 않습니다." });
  const token = createJwtToken(user.dataValues.id);
  const userName = user.dataValues.name;
  res.status(200).json({ token: `Bearer ${token}`, email, name: userName, userId: user.id });
}

function createJwtToken(id) {
  return jwt.sign({ id }, secretKey, { expiresIn: jwtExpiresInDays });
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
  res.status(200).json({ token: req.token, email: user.email, name: user.name });
}
