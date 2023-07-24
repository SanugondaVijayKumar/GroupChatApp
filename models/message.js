//here we define the messages table.
const Sequelize = require('sequelize');
const sequelize = require("../util/database");

const message = sequelize.define("messages",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    message: Sequelize.STRING,
    userId: Sequelize.INTEGER,
    userName: Sequelize.STRING,
    groupId: Sequelize.INTEGER

})

module.exports = message;