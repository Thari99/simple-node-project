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
    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contact);
});

//@desc Get contacts
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact)
});

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    };
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updatedContact)
});

//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.remove(); // This removes the document from the database
    res.status(200).json(contact);
});

module.exports = {getContacts,
                 createContact,
                 getContact,
                 updateContact,
                 deleteContact};