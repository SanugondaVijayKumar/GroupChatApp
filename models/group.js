//here we define the table.
const Sequelize = require('sequelize');
const sequelize = require("../util/database");

const group = sequelize.define("groups",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    groupName:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = group;