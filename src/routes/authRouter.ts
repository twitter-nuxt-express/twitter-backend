// authRouter.ts
import { body } from "express-validator";
import { Router } from "express";
import {
  authController,
  uploadMiddleware,
} from "../controllers/authController";

import roleMiddleware from "../middlewaree/roleMiddleware";

const authRouter = Router();

// authRouter.post(
//   "/registration",
//   [
//     check("login", "Имя пользователя не может быть пустым").notEmpty(),
//     check(
//       "password",
//       "Пароль должен быть больше 4 и меньше 10 символов",
//     ).isLength({ min: 4, max: 10 }),
//   ],
//   controller.registration,
// );

authRouter.post(
  "/registration",
  uploadMiddleware, // Middleware для загрузки аватара
  [
    body("login", "Имя пользователя не может быть пустым").notEmpty(),
    body(
      "password",
      "Пароль должен быть больше 4 и меньше 10 символов",
    ).isLength({ min: 5, max: 10 }),
  ],
  authController.registration,
);

authRouter.post("/login", authController.login);
authRouter.get("/users", roleMiddleware(["ADMIN"]), authController.getUsers);

export default authRouter;
