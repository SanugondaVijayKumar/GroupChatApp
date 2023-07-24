const express = require('express');
const routes = express.Router();
const userAuthentication = require("../middleware/auth");
const messageControl = require("../controllers/message-control");


//get all messages
routes.get("/show-message/:id",userAuthentication.authenticate, messageControl.getMessages);

routes.post("/add-message", userAuthentication.authenticate, messageControl.addMessage);



module.exports = routes;