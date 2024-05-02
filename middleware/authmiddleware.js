const jwt=require('jsonwebtoken');
const User=require('../model/Schemauser');

const sendtoken=(req,res,next)=>{
const token=req.cookies.jwt;
console.log(token);
if(token){
    jwt.verify(token,'the secret of this project'/*the same as sign of the token*/,(err,decodetoken)=>{
if(err){
console.log(err.message);
res.redirect('/sign-in')
}else{
    console.log(decodetoken);
    next();
}

    })

}else{
    res.redirect('/sign-in')
}
 }; 
const checkuser=(req,res,next)=>{
const token =req.cookies.jwt;
if(token){
    jwt.verify(token,'the secret of this project'/*the same as sign of the token*/,async(err,decodetoken)=>{
        if(err){
        console.log(err.message);
        res.locals.user=null;
        next();
        }else{
            console.log('token id',decodetoken.id);
            let user = await User.findById(decodetoken.id)
            res.locals.user=user;
            next();
        }
            })
        
}else{
    res.locals.user=null;
    next();
}
};
 module.exports={sendtoken,checkuser};