const express = require('express');
const roleController = require('../controllers/roleController');

const roleRouter = express.Router();

roleRouter.get('/roles', roleController.getRoles);

module.exports = roleRouter;