import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(postRouter);

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
