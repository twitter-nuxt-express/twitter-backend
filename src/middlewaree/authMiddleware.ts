// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../config";

export default function (
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
    const decodedData = jwt.verify(token, secret);
    req.user = decodedData; // Убедитесь, что типы для req.user также указаны
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Пользователь не авторизован" });
  }
}
