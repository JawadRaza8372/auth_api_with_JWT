const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,minlength:5,maxlength:255
    },
    email:{
        type:String,required:true,minlength:5,maxlength:255
    },
    password:{
        type:String,required:true,minlength:5,maxlength:255
    },

},{
    timestamps:true
});
const User=new mongoose.model("UsersAuthent",userSchema);
module.exports=User;