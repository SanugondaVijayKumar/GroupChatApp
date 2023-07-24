//here we define the table.
const Sequelize = require('sequelize');
const sequelize = require("../util/database");

const usergroup = sequelize.define("usergroups",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true 
    },
    userId: Sequelize.INTEGER,
    groupId: Sequelize.INTEGER,
    isAdmin: Sequelize.BOOLEAN
});

module.exports = usergroup;