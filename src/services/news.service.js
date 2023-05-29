import News from "../models/News.js";

const create = (body) => News.create(body);

const findAll = (limit, offset) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const count = () => News.countDocuments();

export default {
  create,
  findAll,
  count,
};
