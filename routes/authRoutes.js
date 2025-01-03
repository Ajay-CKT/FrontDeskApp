const express = require("express");
const authController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.get("/register", authController.register);

module.exports = authRouter;
