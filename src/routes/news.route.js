import {Router} from "express";
import newsController from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const route = Router();
route.get("/", newsController.findAll);
route.post("/",authMiddleware, newsController.create);

export default route;
