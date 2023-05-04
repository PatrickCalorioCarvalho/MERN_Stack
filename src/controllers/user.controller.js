const userService = require("../services/user.service");
const mongoose = require("mongoose");

const create = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;
  if (!name || !username || !email || !password || !avatar || !background) {
    return res.status(400).send({ message: "Preencha todos os campos!!!" });
  }

  const user = await userService.create(req.body);

  if (!user) {
    return res.status(400).send({ message: "Erro ao Inserir Usuario" });
  }

  res.status(201).send({
    message: "Usuario Adicionado com Sucesso",
    user: {
      id: user._id,
      name,
      username,
      email,
      avatar,
      background,
    },
  });
};

const findAll = async (req, res) => {
  const users = await userService.findAll();
  if (users === 0) {
    return res.status(400).send({ message: "Nao ha Usuario Cadastrados" });
  }

  res.send(users);
};

const findById = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "ID Invalido" });
  }
  const user = await userService.findById(id);
  if (!user) {
    return res.status(400).send({ message: "Usuario nao Encontrado" });
  }
  res.send(user);
};

const update = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;

  if (!name && !username && !email && !password && !avatar && !background) {
    return res.status(400).send({ message: "Preencha no minimo um campo !!!" });
  }

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "ID Invalido" });
  }
  
  const user = await userService.findById(id);

  if (!user) {
    return res.status(400).send({ message: "Usuario nao Encontrado" });
  }

  await userService.update(
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
  );
  
  res.send({message:"Usuario Alterado com Sucesso"})
};
module.exports = { create, findAll, findById, update };
