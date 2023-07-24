const group = require('../models/group');
const user = require("../models/user");
const usergroup = require("../models/usergroups");
const message = require("../models/message");
const sequelize = require("../util/database");

exports.addUserToGroup = async(req,res,next)=>{
    try{
        var userid = req.body.userid;
        var groupid = req.body.groupid;
        console.log(userid, groupid);
        const adding = await usergroup.create({
            userId: userid,
            groupId: groupid,
            isAdmin: false
        });
        return res.json({
            success:true,
            addData:adding,
            msg:"User data added to group"
        })

    }catch(err){
        console.log(err);
    }
}

exports.usersOfGroup = async(req,res,next)=>{
    try{
        const userdata = await user.findAll();
        return res.json({
            success:true,
            userData: userdata
        })


    }catch(err){
        console.log(err);
    }
}