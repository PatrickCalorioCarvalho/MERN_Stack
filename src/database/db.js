import mongoose from "mongoose";

const connertcDatabase = () => {
  console.log("Tentando Conectar ao Banco de Dados");

  mongoose
    .connect( process.env.MONGODB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Mongo DB Atlas Conectado"))
    .catch((error) => console.log(error));
};

export default connertcDatabase;
