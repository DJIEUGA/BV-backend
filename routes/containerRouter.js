const express = require('express');

const containerRouter = express.Router();

const containerController = require("../controllers/containerController");


containerRouter.post("/containers", containerController.addContainer);


containerRouter.get("/containers", containerController.getContainers);


containerRouter.get("/container/:id", containerController.getContainerById);

module.exports = containerRouter;