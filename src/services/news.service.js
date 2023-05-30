import News from "../models/News.js";

const create = (body) => News.create(body);

const findAll = (limit, offset) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const topNews = () => News.findOne().sort({ _id: -1 }).populate("user");

const count = () => News.countDocuments();

const findById = (id) => News.findById(id).populate("user"); 

export default {
  create,
  findAll,
  count,
  topNews,
  findById,
};
