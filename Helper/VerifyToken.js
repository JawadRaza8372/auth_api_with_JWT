var jwt = require('jsonwebtoken');
module.exports=function(req,res,next){
let token=req.header('auth-token')
if(!token){
    res.status(400).send('Access Denied')
}
else{
    try{
        const verified=jwt.verify(token, process.env.token_secret)
        req.user=verified;
        next()
    }
    catch(err){
        res.status(400).send(err)
    }
}
}