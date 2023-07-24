const Sequelize=require('sequelize');
require('dotenv').config();

const sequelize=new Sequelize('chatapp','root','Vijay#2000',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;