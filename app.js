const express = require("express");
const { v4: uuidv4 } = require("uuid"); // Импортируем функцию для генерации UUID

const app = express();

const users = [
  {
    id: 1,
    name: "Test",
    age: 25,
  },
];

app.use(express.json());

const getHandler = (req, res) => {
  console.log("Handler");
  res.json(users);
};

const postHandler = (req, res) => {
  const id = uuidv4(); // Генерируем UUID
  res.json({ id, data: req.body });
  users.push({ id, ...req.body });
};

app.get("/", getHandler);
app.post("/", postHandler);

app.listen(5000, () => {
  console.log("Server was started on port 5000");
});
