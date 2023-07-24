const Sequelize=require("sequelize")
require('dotenv').config();

// const sequelize=new Sequelize(`${process.env.DATABASE_NAME}`,`${process.env.DATABASE_ROOT}`,`${process.env.DATABASE_PASSWORD}`,{
//     dialect:`${process.env.DATABASE_DIALECT}`,
//     host:`${process.env.DATABASE_HOST}`
// })
const sequelize=new Sequelize(`chatapp`,`root`,`5424`,{
    dialect:`mysql`,
    host:`localhost`
})

module.exports=sequelize;