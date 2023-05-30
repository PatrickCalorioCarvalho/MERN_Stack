import newsService from "../services/news.service.js";
import log from "../loggers/logToDisk.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    if (!title || !text || !banner) {
      return res.status(400).send({ message: "Preencha todos os campos!!!" });
    }

    const news = await newsService.create({
      title,
      text,
      banner,
      user: req.userId,
    });

    if (!news) {
      return res.status(400).send({ message: "Erro ao Inserir Usuario" });
    }

    res.status(201).send({
      message: "Post Adicionado com Sucesso",
      news: {
        id: news._id,
        title,
        text,
        banner,
      },
    });
  } catch (e) {
    log.LogException(req, e.message);
    res.status(500).send({ message: e.message });
  }
};

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;
    limit = Number(limit);
    offset = Number(offset);
    if (!limit) limit = 5;
    if (!offset) offset = 0;
    const total = await newsService.count();
    const currentUrl = req.baseUrl;
    const nextOffset = offset + limit;
    const nextUrl =
      nextOffset < total
        ? `${currentUrl}?limit=${limit}&offset=${nextOffset}`
        : null;
    const previousOffset = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previousOffset != null
        ? `${currentUrl}?limit=${limit}&offset=${previousOffset}`
        : null;
    const news = await newsService.findAll(limit, offset);
    if (news === 0) {
      return res.status(400).send({ message: "Nao ha Post Cadastrados" });
    }
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      result: news.map((newsItem) => ({
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comments,
        name: newsItem.user.name,
        username: newsItem.user.username,
        avatar: newsItem.user.avatar,
      })),
    });
  } catch (e) {
    log.LogException(req, e.message);
    res.status(500).send({ message: e.message });
  }
};

const topNews = async (req, res) => {
  try {
    const news = await newsService.topNews();
    if (!news) {
      return res.status(400).send({ message: "Nao ha Post Cadastrados" });
    }
    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        username: news.user.username,
        avatar: news.user.avatar,
      },
    });
  } catch (e) {
    log.LogException(req, e.message);
    res.status(500).send({ message: e.message });
  }
};

const findById = async (req, res) => {
  try {
    const {id} = req.params;
    const news = await newsService.findById(id);
    if (!news) {
      return res.status(400).send({ message: "Nao ha Post Cadastrados" });
    }
    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        username: news.user.username,
        avatar: news.user.avatar,
      },
    });
  } catch (e) {
    log.LogException(req, e.message);
    res.status(500).send({ message: e.message });
  }
};

export default { create, findAll, topNews, findById };
