// authRouter.ts
import { Router } from "express";
import controller from "../controllers/authController";
import { check } from "express-validator";
import authMiddleware from "../middlewaree/authMiddleware";
import roleMiddleware from "../middlewaree/roleMiddleware";

const authRouter = Router();

authRouter.post(
  "/registration",
  [
    check("login", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 и меньше 10 символов",
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration,
);

authRouter.post("/login", controller.login);
authRouter.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);

export default authRouter;
