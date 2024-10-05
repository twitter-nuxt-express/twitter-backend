import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { Role } from "./entity/Role";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", // замени на твой логин
  password: "1234", // замени на твой пароль
  database: "twitter", // замени на название твоей базы данных
  synchronize: true,
  logging: true,
  entities: [User, Post, Role],
  subscribers: [],
  migrations: [],
});
