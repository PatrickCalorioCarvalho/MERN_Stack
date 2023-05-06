import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authUserByEmail = (email) =>
  User.findOne({ email: email }, { password: 1, email: 1 });

const generateToken = (id) =>
  jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });

export { authUserByEmail,generateToken };
