const express=require('express');
const app=express();
const port=process.env.PORT || 5000;
let auth=require("./routes/authRoutes")
let post=require("./routes/protectedRoutes")

const mongoose=require('mongoose');
require('dotenv').config();
app.use(express.json())
app.use(auth)
app.use(post)


const uri=`${process.env.ATLAS_URI}`;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("mongodb connection is successfull");
})



app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`);
});