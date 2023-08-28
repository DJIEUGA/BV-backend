const express = require('express');
const imageUploadController = require('../controllers/imageUploadController');
const upload = require("../utils/multer");

const uploadImageRouter = express.Router();

uploadImageRouter.post('/upload', imageUploadController.uploadFile);

module.exports = uploadImageRouter;