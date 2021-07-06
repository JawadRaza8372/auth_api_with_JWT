const router=require("express").Router();
const authmodel=require('../Model/User');
const {RegisterValidationSchema,LoginValidationSchema}=require("../Helper/AuthValidator")
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');


router.post('/register',async(req,res,next)=>{
    var hashpass = bcrypt.hashSync(req.body.password, salt);

    const user=new authmodel({name:req.body.name,email:req.body.email,password:hashpass})

    const {error,value}=RegisterValidationSchema.validate({name:req.body.name,email:req.body.email,password:req.body.password})
    if (error){
        res.status(400).send({message:error.details[0].message})
    }
    else{
        let emailExists=await authmodel.findOne({email:req.body.email});
if(emailExists){
    res.status(200).send("Email is already used.")

}
else{
    try{
        let savedUser=await user.save()
        res.status(200).send(savedUser._id)
        
        }
        catch(err){
            res.status(400).send(err)
        }

}
           }

})

router.post('/login',async(req,res,next)=>{
    const user=new authmodel({email:req.body.email,password:req.body.password})

    const {error,value}=LoginValidationSchema.validate({email:req.body.email,password:req.body.password})
    if (error){
        res.status(400).send({message:error.details[0].message})
    }
    else{
        let userAccount=await authmodel.findOne({email:req.body.email});
        if(!userAccount){
            res.status(200).send("Email is not found")
        
        }
        else{
            try{
             let validPass = await bcrypt.compareSync(req.body.password, userAccount.password);
             console.log(validPass)
             if (validPass){
                var token = jwt.sign({ userId:userAccount._id }, process.env.token_secret);

                 res.header('auth-token',token).status(200).send(token);
                }
             else {
                 res.status(400).send("password is wrong")
                }
                }
                catch(err){
                    res.status(400).send(err)
                }
        }
       
    }

})











module.exports=router