const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async(req,res)=>{
    const {username, email, password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mendatory");
        
    }
    const userAvailable = await User.findOne({email}); 
    if(userAvailable){
        res.status(400);
        throw new Error("User Already registerd");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hash password",hashPassword);
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("User data is not valid");
        
    }
    res.json({message: "register the user"});
});

//@desc login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req,res)=>{
    const {email, password}= req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mendatory");
    }
    const user = await User.findOne({email});
    //compare pw with db hashed pw
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECER,
        {expiresIn:"1m"}

    );
        res.status(200).json({accessToken});
    }else{
        res.status(401)
        throw new Error("Email or pawwsord  not valid");
        
    }
});

//@desc current a user
//@route POST /api/users/current
//@access privete
const currentUser = asyncHandler(async(req,res)=>{
    res.json({message: "Current user information"});
});

module.exports = {registerUser , loginUser,currentUser};