import express, { Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Post } from "./entity/Post";

const app = express();
app.use(cors());
app.use(express.json());

// Инициализация подключения к базе данных
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch(error =>
    console.log("Error during Data Source initialization", error),
  );

// Маршруты
app.get("/users", async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  res.json(users);
});

app.post("/users", async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const newUser = userRepository.create(req.body);
  await userRepository.save(newUser);
  res.json(newUser);
});

app.get("/", async (req: Request, res: Response) => {
  const postRepository = AppDataSource.getRepository(Post);
  const posts = await postRepository.find({ relations: ["user"] });
  res.json(posts);
});

app.post("/", async (req: Request, res: Response) => {
  const postRepository = AppDataSource.getRepository(Post);
  const newPost = postRepository.create(req.body);
  await postRepository.save(newPost);
  res.json(newPost);
});
