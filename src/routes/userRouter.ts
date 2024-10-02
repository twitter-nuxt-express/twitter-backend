import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.post("/users", userController.create);
userRouter.get("/users", userController.getAll);

export default userRouter;
