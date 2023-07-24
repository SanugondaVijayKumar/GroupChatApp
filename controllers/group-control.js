const group = require('../models/group');
const user = require("../models/user");
const message = require("../models/message");
const sequelize = require("../util/database");
const usergroup = require("../models/usergroups");

exports.addGroup = async(req,res,next)=>{
    //const transaction = await sequelize.transaction();
    try{
        const groupname = req.body.groupname;
        console.log(groupname);
        const data = await group.create({
            groupName: groupname
        });

        grpId = data.dataValues.id;
        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", groupIDDDDDD);
        const usergroupdata = await usergroup.create({
            groupId: grpId,
            userId: req.user.id,
            isAdmin: true
        })
        //await transaction.commit();
        return res.json({
            msg:"Data added",
            success: true,
            newGroup: data
        });

    }catch(err){
        //transaction.rollback();
        console.log(err);
        return res.json({
            Error: err,
            success: false
        })
    }
}

exports.getGroups = async(req,res,next)=>{
    const transaction = await sequelize.transaction();
    try{
        const data = await group.findAll();
        console.log(data);
        transaction.commit();
        return res.json({
            msg:"all groups retrieved",
            success: true,
            allGroups: data
        }) 

    }catch(err){
        transaction.rollback();
        console.log(err);
        return res.json({
            Error: err,
            success: false
        })
    }
}


// exports.addUsertoGroup = async(req,res,next)=>{
//     try{
        
//         if(!groupid){
//             throw new Error("ID is mandatory");
//         }
//         const groupid = req.body.groupId;
//         console.log(groupid)
//         const userId = req.user.id;
//         console.log(userId);

//     }catch(err){
//         console.log(err);
//     }
// }