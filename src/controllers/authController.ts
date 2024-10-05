import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Role } from "../entity/Role";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { secret } from "../config";

const generateAccessToken = (id: string, roles: string[]): string => {
  const payload = { id, roles };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
  async registration(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array()); // Вывод ошибок в консоль
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }

      const { login, password } = req.body;

      const userRepository = AppDataSource.getRepository(User);
      const roleRepository = AppDataSource.getRepository(Role);

      const candidate = await userRepository.findOne({ where: { login } });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      let userRole = await roleRepository.findOne({
        where: { value: "USER" },
      });

      // Если роль не найдена, создаем новую
      if (!userRole) {
        userRole = roleRepository.create({
          value: "USER",
        });
        await roleRepository.save(userRole); // Сохраняем новую роль в базе данных
      }

      if (!userRole) {
        return res.status(500).json({ message: "Роль не найдена" });
      }

      const user = userRepository.create({
        login,
        password: hashPassword,
        roles: [userRole.value],
      });

      await userRepository.save(user);
      return res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: "Ошибка регистрации" });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { login, password } = req.body;
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOne({ where: { login } });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${login} не найден` });
      }

      if (!user.password) {
        return res.status(400).json({ message: "Пароль не найден" });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Введен неверный пароль" });
      }

      const token = generateAccessToken(
        user.id?.toString() || "",
        user.roles || [],
      );
      return res.json({ token, userId: user.id });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: "Ошибка при входе в систему" });
    }
  }

  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();
      return res.json(users);
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ message: "Ошибка при получении пользователей" });
    }
  }
}

export default new AuthController();
