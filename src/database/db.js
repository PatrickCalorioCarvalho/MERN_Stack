const mongoose = require("mongoose");

const connertcDatabase = () => {
  console.log("Tentando Conectar ao Banco de Dados");

  mongoose
    .connect(
      "mongodb+srv://locahost",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Mongo DB Atlas Conectado"))
    .catch((error) => console.log(error));
};

module.exports = connertcDatabase;
