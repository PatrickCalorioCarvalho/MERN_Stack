import express from "express";
import connertcDatabase from "./src/database/db.js";
import userRoute from "./src/routes/user.route.js";
import dotenv from "dotenv"
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connertcDatabase();
app.use(express.json());
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

//mern_stack
//yPPMb6OYwN3Q9L67
