const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(requestAnimationFrame, resizeBy, next)=>{
    let token;
    let authHeader = req.header.Authorization || req.header.authorization ;
    if(authHeader &&authHeader.startwith("Bearer") ){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECERT, (err, decoded)=>{
            if(err){
                resizeBy.status(401);
                throw new Error("user not authorize");
                
            }
            console.log(decoded);
        })
    }
});
module.exports = validateToken;