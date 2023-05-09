import express from "express";
import connertcDatabase from "./src/database/db.js";
import dotenv from "dotenv"


import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import newsRoute from "./src/routes/news.route.js";



dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

connertcDatabase();
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/news", newsRoute);


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

//mern_stack
//yPPMb6OYwN3Q9L67
