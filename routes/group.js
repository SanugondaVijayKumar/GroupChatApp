const express = require('express');
const routes = express.Router();
const userAuthentication = require('../middleware/auth');
const groupControl = require('../controllers/group-control');


//adding group
routes.post("/add-group", userAuthentication.authenticate, groupControl.addGroup);

//getting all groups
routes.get("/get-groups", userAuthentication.authenticate, groupControl.getGroups);


module.exports = routes;