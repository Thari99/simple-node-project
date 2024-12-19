const express = require("express");
const errorHnadler = require("./middleware/errorhandler");
const dotenv = require ("dotenv").config()

const app = express();

const port = process.env.PORT || 5000;
// that help to display request body parms
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHnadler);

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})