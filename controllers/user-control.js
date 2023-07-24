const user = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const sequelize = require("../util/database");

exports.addUser = async(req,res, next)=>{
    const transaction = await sequelize.transaction();
    try{
        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const checkemail = req.body.email;
        const password = req.body.password;
        let totalExpense = 0;
        if(password.length<5){
            return(res.json({msg:"password should atleast contain 5 letters",
        success: false}));
        }
        bcrypt.hash(password, 5, async(error, hash)=>{
            if(error){
                return res.json({msg:"Encryption error", success:false});
            }else{
                const found = await user.findAll({
                    where:{
                        email: checkemail
                    }
                })
                if(found.length != 0){
                    res.json({
                        msg:"User Already exists!! Please enter a different email", 
                        success:false
                    });
                }else{
                    const data = await user.create({
                    name:name,
                    phone:phone,
                    email:email,
                    password:hash,
                    totalExpense:totalExpense
                },{
                    transaction: transaction
                })
                res.json({newUser: data, msg:"User created", success: true});
                await transaction.commit();
            }   
             
            }

        }) 
    }
    catch(err){
        console.log(err);
    }
}


function generateAccessToken(id, islogged){
    return jwt.sign({userId: id, islogged}, 'secretKeyIsBiggerValue')
}


exports.userLogin = async(req,res,next)=>{
    const transaction = await sequelize.transaction();
    try{
        const checkemail = req.body.email;
        const checkpassword = req.body.password;
        //console.log(checkemail);
       //const user_id = req.user.id;
        //console.log(user_id);
        const login = await user.findAll({
            where:{
                email: checkemail
            }
        },{
            transaction: transaction
        });
        //console.log(login[0]);
        if(login.length>0){
            bcrypt.compare(checkpassword, login[0].password, async(err, result)=>{
                if(err){
                    return res.json({
                        msg:"dcryting error",
                        success: false
                    });
                }
                console.log(result);
                if(result === true){
                    return res.json({
                        msg:"Password is correct",
                        success: true,
                        token: generateAccessToken(login[0].id, login[0].islogged)                        
                    });
                    await transaction.commit();
                }else{
                    return res.json({
                        success:false,
                        msg: "Pasword incorrect"
                    });
                }
            });
        }else{
            return res.json("User doesnt exist");
        }


    }catch(err){
        console.log(err);
        await transaction.rollback();
    }
}