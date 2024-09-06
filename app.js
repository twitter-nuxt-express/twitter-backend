const express = require("express");
const { v4: uuidv4 } = require("uuid"); // Импортируем функцию для генерации UUID
const cors = require("cors");

const app = express();
app.use(cors());

const users = [
  {
    userId: "1",
    login: "Dimash",
    password: "123",
    avatar: "",
  },
];

const posts = [
  {
    id: 1,
    name: "Dimash",
    content: "Практикую бекенд",
    userId: 1,
  },
  {
    id: 2,
    name: "Adil",
    content: "Читаю книгу",
  },
  {
    id: 3,
    name: "Alish",
    content: "Работаю в Самгау",
  },
  {
    id: 1,
    name: "Dimash",
    content: "Плаваю в бассейне",
  },
];

app.use(express.json());
console.log(12);

const getHandler = (req, res) => {
  res.json(posts);
};

const postHandler = (req, res) => {
  const id = uuidv4();
  req.body.id = id;
  posts.unshift(req.body);
  res.json(req.body);
};

const getByIdHandler = (req, res) => {
  const filteredPosts = posts.filter(user => {
    return user.id === 1;
  });

  const singleUserPosts = filteredPosts.map(filteredPost => {
    return filteredPost.content;
  });

  res.json(singleUserPosts);
};

app.get("/", getHandler);
app.post("/", postHandler);
app.get("/1", getByIdHandler);

app.listen(5000, () => {
  console.log("Server was started on port 5000");
});
