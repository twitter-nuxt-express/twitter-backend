import { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

class userController {
  async create(req: Request, res: Response) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const newUser = userRepository.create(req.body);
      await userRepository.save(newUser);
      res.json(newUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: +req.params.id }); // Получаем id из URL
    res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new userController();
