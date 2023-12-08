const { Router } = require("express");
const { handlerGetAllDrivers, handlerGetDriverByName, handlerGetDriverById, handlerCreateNewDriver } = require("../handlers/driversHandlers");


const driversRouter = Router();


driversRouter.get("/name", handlerGetDriverByName);
driversRouter.get("/:id", handlerGetDriverById);
driversRouter.get("/", handlerGetAllDrivers);
driversRouter.post("/", handlerCreateNewDriver);

module.exports = driversRouter;
