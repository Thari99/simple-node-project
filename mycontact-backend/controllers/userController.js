const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
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
    res.json({message: "register the user"});
});

//@desc login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req,res)=>{
    res.json({message: "Login user"});
});

//@desc current a user
//@route POST /api/users/current
//@access privet
const currentUser = asyncHandler(async(req,res)=>{
    res.json({message: "Current user information"});
});

module.exports = {registerUser , loginUser,currentUser};