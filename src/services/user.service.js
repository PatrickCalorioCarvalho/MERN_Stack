import User from "../models/User.js";

const create = (body) => User.create(body);

const findAll = () => User.find();

const findById = (id) => User.findById(id);

const update = (id, name, username, email, password, avatar, background) =>
  User.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, avatar, background }
  );

const deleted = (id) => User.deleteOne({ _id: id });

export default {
  create,
  findAll,
  findById,
  update,
  deleted,
};
