import { Router } from "express";
import postController from "../controllers/postController";

const postRouter = Router();

postRouter.get("/", postController.getAll);
postRouter.post("/", postController.create);
postRouter.get("/:userId", postController.getUserPosts);
postRouter.get("/:userId/:postId", postController.getUserPostById);
postRouter.put("/:postId", postController.editUserPost);
postRouter.delete("/:postId", postController.deleteUserPost);

export default postRouter;
