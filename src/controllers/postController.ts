import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";

class postController {
  async create(req: Request, res: Response) {
    try {
      const postRepository = AppDataSource.getRepository(Post);
      const newPost = postRepository.create(req.body);
      await postRepository.save(newPost);
      res.json(newPost);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const postRepository = AppDataSource.getRepository(Post);
      const posts = await postRepository.find({ relations: ["user"] });
      res.json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new postController();
