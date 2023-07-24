const express=require('express');
const path=require('path');
const sequelize=require("./util/database");
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const userRoutes=require('./routes/user');

const app=express();
app.use(express.json());
app.use(cors());

app.use(userRoutes);


sequelize.sync()
.then(()=>{
    app.listen(3000,()=>{
        console.log('server is running on port 3000');
    });
}).catch(err=>{
    console.log(err);
})
