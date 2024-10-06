import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

class postController {
  async create(req: Request, res: Response) {
    try {
      const postRepository = AppDataSource.getRepository(Post);
      const userRepository = AppDataSource.getRepository(User);

      // Находим пользователя по userId
      const user = await userRepository.findOne({
        where: { id: req.body.userId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Создаём новый пост и устанавливаем пользователя
      const newPost = postRepository.create({
        name: req.body.name,
        content: req.body.content,
        user: user, // передаем объект пользователя
      });

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
      res.json(posts.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getUserPosts(req: Request, res: Response) {
    try {
      const postRepository = AppDataSource.getRepository(Post);
      const userPosts = await postRepository.find({
        where: { user: { id: +req.params.userId } }, // Здесь userId — это ID пользователя
        relations: ["user"], // Это чтобы подтянуть данные о пользователе
      });
      res.json(userPosts.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new postController();
