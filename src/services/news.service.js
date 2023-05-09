import User from "../models/News.js";

const create = (body) => User.create(body);

const findAll = () => User.find();

export default {
  create,
  findAll,
};
