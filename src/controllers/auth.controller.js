import { authUserByEmail,generateToken } from "../services/auth.service.js";
import log from "../loggers/logToDisk.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authUserByEmail(email);
    if (!user)
      return res.status(401).send({ message: "Usuario e Senha Invalidos" });

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ message: "Usuario e Senha Invalidos" });
    
    const token = generateToken(user._id);
    res.status(200).send({token});
  } catch (e) {
    log.LogException(req, e.message);
    res.status(500).send({ message: e.message });
  }
};

export { login };
