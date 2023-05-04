const mongoose = require("mongoose");

const connertcDatabase = () => {
  console.log("Tentando Conectar ao Banco de Dados");

  mongoose
    .connect(
      "mongodb+srv://mern_stack:yPPMb6OYwN3Q9L67@cluster0.lzy5ydz.mongodb.net/MERN_DB?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Mongo DB Atlas Conectado"))
    .catch((error) => console.log(error));
};

module.exports = connertcDatabase;
