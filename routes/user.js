const express = require('express');
const routes = express.Router();
const userControl = require("../controllers/user-control");

//adding user
routes.post("/add-user", userControl.addUser);

//login
routes.post("/user-login", userControl.userLogin);


module.exports = routes;