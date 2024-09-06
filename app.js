const express = require("express");
const { v4: uuidv4 } = require("uuid"); // Импортируем функцию для генерации UUID
const cors = require("cors");

const app = express();
app.use(cors());

const users = [
  {
    id: 1,
    name: "Test",
    comment: "Comment 1",
  },
  {
    id: 2,
    name: "Test 2",
    comment: "Comment 2",
  },
  {
    id: 3,
    name: "Test 3",
    comment: "Comment 3",
  },
];

app.use(express.json());

const getHandler = (req, res) => {
  console.log("Handler");
  res.json(users);
};

const postHandler = (req, res) => {
  const id = uuidv4();
  req.body.id = id;
  users.push(req.body);
  res.json(req.body);
};

const getByIdHandler = (req, res) => {};

app.get("/", getHandler);
app.post("/", postHandler);
app.get("/id", getByIdHandler);

app.listen(5000, () => {
  console.log("Server was started on port 5000");
});
