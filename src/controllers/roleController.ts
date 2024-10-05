import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Role } from "../entity/Role";

class RoleController {
  async createRole(req: Request, res: Response): Promise<Response> {
    try {
      const { value } = req.body;

      const roleRepository = AppDataSource.getRepository(Role);
      const roleExists = await roleRepository.findOne({ where: { value } });
      if (roleExists) {
        return res.status(400).json({ message: "Роль уже существует" });
      }

      const role = roleRepository.create({ value });
      await roleRepository.save(role);
      return res.status(201).json({ message: "Роль успешно создана", role });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Ошибка при создании роли" });
    }
  }

  async getRoles(req: Request, res: Response): Promise<Response> {
    try {
      const roleRepository = AppDataSource.getRepository(Role);
      const roles = await roleRepository.find();
      return res.json(roles);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Ошибка при получении ролей" });
    }
  }
}

export default new RoleController();
