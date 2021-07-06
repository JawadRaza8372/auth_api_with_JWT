const router=require("express").Router();
const authmodel=require('../Model/User');
const VerifyToken=require("../Helper/VerifyToken")



router.get('/post',VerifyToken,async(req,res,next)=>{
    res.send(req.user)
})











module.exports=router