// app create
const express = require('express');
const app = express();

// PORT find
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware add krna hn
app.use(express.json());
// express js does not have any way to how to interact with files so for that we need 
// file upload middleware for that install (npm i express-fileupload)
const fileupload = require("express-fileupload");
app.use(fileupload());


// db connection
const dB = require('./config/database');
dB.connect();

// cloud se connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// api route mount 
const upload = require('./routes/FileUpload');
app.use('/api/v1/upload',upload);

// activate server
app.listen(PORT , ()=>{
    console.log(`App is running at ${PORT}`);
})