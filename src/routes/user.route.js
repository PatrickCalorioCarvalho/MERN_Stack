const route = require("express").Router();
const userController = require("../controllers/user.controller");

route.get("/", userController.findAll);
route.get("/:id", userController.findById);
route.post("/", userController.create);
route.patch("/:id", userController.update);
module.exports = route;
