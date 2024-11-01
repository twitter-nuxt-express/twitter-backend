import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";
import authRouter from "./routes/authRouter";
import fileUpload from "express-fileupload";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.use(authRouter);
app.use(fileUpload({}));
app.use(express.static("uploads"));

console.log(path.join(__dirname, "uploads"));

// Инициализация подключения к базе данных
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch(error =>
    console.log("Error during Data Source initialization", error),
  );
