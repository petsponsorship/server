import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../data/auth.js";
import { config } from "../config.js";

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
  const refreshToken = createJwtRefreshToken(userId.dataValues.id);
  const accessToken = createJwtAccessToken(userId.dataValues.id);
  userRepository.createRefreshToken(userId, refreshToken);
  res.status(201).json({
    refreshToken: `Bearer ${refreshToken}`,
    accessToken: `Bearer ${accessToken}`,
    email,
    name,
    userId: userId.dataValues.id,
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await userRepository.findByEmail(email);
  if (!user) return res.status(401).json({ message: "이메일 혹은 비밀번호가 맞지 않습니다." });
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    return res.status(401).json({ message: "이메일 혹은 비밀번호가 맞지 않습니다." });
  const refreshToken = createJwtRefreshToken(user.dataValues.id);
  const accessToken = createJwtAccessToken(user.dataValues.id);
  userRepository.createRefreshToken(user.id, refreshToken);
  const userName = user.dataValues.name;
  res.status(200).json({
    refreshToken: `Bearer ${refreshToken}`,
    accessToken: `Bearer ${accessToken}`,
    email,
    name: userName,
    userId: user.id,
  });
}

export function createJwtAccessToken(id) {
  // 유효 1시간 // test 3분
  return jwt.sign({ id }, secretKey, { expiresIn: config.jwt.expiredHours });
}

function createJwtRefreshToken(id) {
  // 유효 14일
  return jwt.sign({ id }, secretKey, { expiresIn: config.jwt.expiredDays });
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
  res.status(200).json({
    refreshToken: req.refreshToken,
    accessToken: req.accessToken,
    email: user.email,
    name: user.name,
  });
}
