const { Router } = require("express");
const appRouter = Router();
const appController = require("../controllers/appController");


appRouter.get("/", appController.messageRender);
appRouter.get("/new", appController.newMessageGet);
appRouter.post("/new", appController.newMessagePost);

module.exports = appRouter;