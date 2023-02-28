import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { createJwtAccessToken } from "../controller/auth.js";
import * as userRepository from "../data/auth.js";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  const refreshToken = req.get("RefreshToken");
  const accessToken = authHeader?.split(" ")[1];

  if (refreshToken) {
    if (!refreshToken.startsWith("Bearer ")) return res.status(401).json(AUTH_ERROR);
    const userId = await userRepository.findByRefreshToken(refreshToken);
    if (!userId) return res.status(401).json(AUTH_ERROR);
    const accessToken = createJwtAccessToken(userId);
    req.userId = userId;
    return res.status(200).json({ accessToken: `Bearer ${accessToken}` });
  }

  if (!refreshToken) {
    if (!authHeader.startsWith("Bearer ")) return res.status(401).json(AUTH_ERROR);
    jwt.verify(accessToken, config.jwt.secretKey, async (error, decoded) => {
      if (error) return res.status(401).json(AUTH_ERROR);
      const user = await userRepository.findById(decoded.id);
      if (!user) return res.status(401).json(AUTH_ERROR);
      req.userId = user.id;
      next();
    });
  }
};
