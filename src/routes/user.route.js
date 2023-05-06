import express from "express";
import userController from "../controllers/user.controller.js";
import middleware from "../middlewares/global.middlewares.js";

const route = express.Router();
route.get("/", userController.findAll);
route.get("/:id", middleware.validId, middleware.validUser, userController.findById);
route.post("/", userController.create);
route.patch("/:id", middleware.validId, middleware.validUser, userController.update);
route.delete("/:id", middleware.validId, middleware.validUser, userController.deleted);

export default route;
