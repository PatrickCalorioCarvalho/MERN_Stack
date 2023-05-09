import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";
import log from "../loggers/logToDisk.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(401).send({ message: "token Invalido" });

    const parts = authorization.split(" ");
    if (parts.length !== 2)
      return res.status(401).send({ message: "token Invalido" });

    const [schema, token] = parts;
    if (schema !== "Bearer")
      return res.status(401).send({ message: "token Invalido" });
    if (schema !== "Bearer")
      return res.status(401).send({ message: "token Invalido" });

    jwt.verify(token, process.env.SECRET_JWT, async (erro, decoded) => {
      if (erro) return res.status(401).send({ message: "token Invalido" });
      const user = await userService.findById(decoded.id);
      if (!user || !user._id)
        return res.status(401).send({ message: "token Invalido" });

      req.userId = user._id;

      return next();
    });
  } catch (e) {
    log.LogException(req, e.message);
    res.status(500).send({ message: e.message });
  }
};
