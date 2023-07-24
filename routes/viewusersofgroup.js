const express = require('express');
const routes = express.Router();
const userAuthentication = require('../middleware/auth');
const usersofgroupControl = require('../controllers/user-of-group');

routes.get("/view-users-of-group", userAuthentication.authenticate, usersofgroupControl.usersOfGroup);

routes.post("/add-user-to-group", usersofgroupControl.addUserToGroup);

module.exports = routes;