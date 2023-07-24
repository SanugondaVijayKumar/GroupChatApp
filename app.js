const express=require("express");
const path = require("path");
const fs = require("fs");
const cors=require("cors");
require('dotenv').config();
const bodyparser=require("body-parser");
const sequelize=require("./util/database");
const io = require("socket.io")(8050);
const cron = require("node-cron");

const userDetails = require("./routes/user");
const messageDetails = require("./routes/message");
const groupDetails = require("./routes/group");
const usersofgroupDetails = require("./routes/viewusersofgroup");

const userTable =require("./models/user");
const messageTable = require("./models/message");
const groupTable = require("./models/group");
const usergroupsTable = require("./models/usergroups");
const archeiveTable = require("./models/archieve");
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(userDetails);
app.use(messageDetails);
app.use(groupDetails);
app.use(usersofgroupDetails);
app.use((req,res)=>{
    res.sendFile(path.join(__dirname, `views/${req.url}`));
})

userTable.hasMany(messageTable);
messageTable.belongsTo(userTable);

groupTable.hasMany(messageTable);
messageTable.belongsTo(groupTable);

groupTable.belongsToMany(userTable,{through: usergroupsTable});
userTable.belongsToMany(groupTable,{through: usergroupsTable});

io.on("connection", socket =>{
    console.log(socket.id);
})

sequelize.sync({}).then(()=>{
    app.listen(2000, ()=>{
        console.log("Server is lietning");
    });
})
cron.schedule("0 9 * * *",async()=>{
    const response=await message.findAll()
    for(let i=0;i<response.length;i++){
     const data=await archeiveTable.create({
         message:response[i].dataValues.message,
         userId:response[i].dataValues.userId,
         groupId:response[i].dataValues.groupId,
         userName:response[i].dataValues.userName
     })
    await message.destroy({where:{id:response[i].dataValues.id}})
    }
    
 },{
     timezone:'Asia/Kolkata'
 })