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
    const news = await newsService.findAll();
    if (news === 0) {
      return res.status(400).send({ message: "Nao ha Post Cadastrados" });
    }
    res.send(news);
  } catch (e) {
    log.LogException(req, e.message);
    res.status(500).send({ message: e.message });
  }
};
export default { create, findAll };
