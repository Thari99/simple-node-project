const asyncHandler = require("express-async-handler");
//asyncHandler catch the errors when that occur
const Contact = require("../models/contactModel")
//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async(req, res)=>{
    const connects = await Contact.find();
    res.status(200).json(connects)
});

//@desc Create contacts
//@route Post /api/contacts
//@access public
const createContact =asyncHandler(async(req, res)=>{
    console.log("the request body is ",req.body);
    const{name, email, phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mendatory !");
    }
    res.status(201).json({message:"Create contacts"})
});

//@desc Get contacts
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async(req, res)=>{
    res.status(200).json({message:`Get contacts for ${req.params.id}`})
});

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req, res)=>{
    res.status(200).json({message:`Update contacts for ${req.params.id}`})
});

//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req, res)=>{
    res.status(200).json({message:`Delete contacts for ${req.params.id}`})
});

module.exports = {getContacts,
                 createContact,
                 getContact,
                 updateContact,
                 deleteContact};