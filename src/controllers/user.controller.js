import userService from "../services/user.service.js";
import log from "../loggers/logToDisk.js";

const create = async (req, res) => {
  try {
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
  } catch (e) {
    log.LogException(req, e.message);
    res.status(500).send({ message: e.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAll();
    if (users === 0) {
      return res.status(400).send({ message: "Nao ha Usuario Cadastrados" });
    }
    res.send(users);
  } catch (e) {
    log.LogException(req, e.message);
    res.status(500).send({ message: e.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (e) {
    log.LogException(req, e.message);
    res.status(500).send({ message: e.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
      return res
        .status(400)
        .send({ message: "Preencha no minimo um campo !!!" });
    }

    const { id, user } = req;

    await userService.update(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );

    res.send({ message: "Usuario Alterado com Sucesso" });
  } catch (e) {
    log.LogException(req, e.message);
    res.status(500).send({ message: e.message });
  }
};

const deleted = async (req, res) => {
  try {
    const id = req.id;
    await userService.deleted(id);
    res.send({ message: "Usuario Alterado com Sucesso" });
  } catch (e) {
    log.LogException(req, e.message);
    res.status(500).send({ message: e.message });
  }
};
export default { create, findAll, findById, update, deleted };
