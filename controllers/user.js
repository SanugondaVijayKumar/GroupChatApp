const User = require("../models/user"); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const sequelize = require("../util/database");
require('dotenv').config();


exports.signup=async (req,res,next)=>{
    try{
        const name=req.body.name;
        const email=req.body.email;
        const checkemail=req.body.email;
        const phonenumber=req.body.phonenumber;
        const password=req.body.password;
        bcrypt.hash(password,5,async (err,hash)=>{
            if(err){
                return res.json({message:'Encryption Error',success:false})
            }
            //checking if the user is already present
            const existingUser = await User.findOne({
                where: { email: checkemail }
              });
              console.log("existingUser=",existingUser);
            if(existingUser){
                return res.json({message:"User Already exists!! Please enter a different email", success:false});
            }

            //creating new user in table
            const data=await User.create({
                name:name,
                email:email,
                phonenumber:phonenumber,
                password:hash
            });
            return res.status(200).json({message:"User created",success:true,newuser:data});
        });
    }
    catch(err){
        console.log(err);
        res.json({message:'something went wrong',success:false});
    }
};