import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.get("/users", userController.getAll);
userRouter.get("/user/:id", userController.getById);

export default userRouter;
