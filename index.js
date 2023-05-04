const express = require("express");
const app = express();

const connertcDatabase = require("./src/database/db");
const userRoute = require("./src/routes/user.route");

const port = 3000;

connertcDatabase();
app.use(express.json());
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

//mern_stack
//yPPMb6OYwN3Q9L67
