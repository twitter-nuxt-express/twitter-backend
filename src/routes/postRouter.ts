import { Router } from "express";
import postController from "../controllers/postController";

const postRouter = Router();

postRouter.post("/", postController.create);

postRouter.get("/", postController.getAll);

export default postRouter;
