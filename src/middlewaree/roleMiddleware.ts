import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../config";

// Создаем интерфейс для типа JWT Payload
interface JwtPayload {
  roles: string[];
  // Добавьте другие свойства, если нужно
}

export default function (roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
      return next();
    }

    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }

      // Приводим тип данных к JwtPayload
      const decodedData = jwt.verify(token, secret) as JwtPayload;

      const userRoles = decodedData.roles; // Теперь TypeScript знает, что это массив строк
      let hasRole = userRoles.some((role) => roles.includes(role));
      if (!hasRole) {
        return res.status(403).json({ message: "У вас нет доступа" });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
  };
}
