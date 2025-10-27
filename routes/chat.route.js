const express = require("express");
const routes = express.Router();

const { chatHandler } = require("../controllers/chat.controller");

routes.post("/text", chatHandler);

module.exports = routes;
