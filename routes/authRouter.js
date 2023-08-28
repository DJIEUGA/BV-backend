const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.get("/users", authController.getAllUsers);

authRouter.post('/register', authController.registerUser);

authRouter.post('/user/complete/:token', authController.completeAccount);

authRouter.post('/login', authController.login);

authRouter.post("/add-user", authController.addUser);

authRouter.delete("/user/delete/:userId", authController.deleteUser);

module.exports = authRouter;