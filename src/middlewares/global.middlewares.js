import userService from "../services/user.service.js";
import log from "../loggers/logToDisk.js";
import mongoose from "mongoose";

const validId = (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "ID Invalido" });
    }
    req.id = id;
    next();
  } catch (e) {
    log.LogException(req, e.message);
    res.status(500).send({ message: e.message });
  }
};

const validUser = async (req, res, next) => {
  try {
    const id = req.id;
    const user = await userService.findById(id);
    if (!user) {
      return res.status(400).send({ message: "Usuario nao Encontrado" });
    }
    req.user = user;
    next();
  } catch (e) {
    log.LogException(req, e.message);
    res.status(500).send({ message: e.message });
  }
};

export default { validId, validUser };
