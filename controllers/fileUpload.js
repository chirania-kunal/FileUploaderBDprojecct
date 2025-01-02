const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localfileUpload -> handler function -  fetch any media from client given path and store that media at server specific path.
exports.localFileUpload = async (req,res)=>{
    try{
        // fetching file from request 
        const file = req.files.file;
        console.log("File AAGYI JEE -> ",file );

        // define server path where you want to store
        // __dirname - current working directory(folder) 
        let path  = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH---> ",path);

        // for file uploading mv method is important to define
        // move or store the file at defined path
        file.mv(path,(err) => {
            console.log(err);
        });

        res.json({
            success : true,
            message : "Local file Uploaded Successfully",
        });

    }catch(error){
        console.log(error);
        console.log("Not able to upload file on server")
    }
}

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type); // return true or false
}

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};

    if(quality){
        options.quality=quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath , options);
}

// image upload to handler
exports.imageUpload = async (req,res) =>{
    try{
        // fetch data from request
        const {name, tags , email} = req.body;
        console.log(name," ",tags, " ", email, " ");
        
        // imageFile is the key in the request URL
        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("FileType:- ",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }
        // File format supported hain
        // upload on cloudinary
        const response = await uploadFileToCloudinary(file,"KunalFolder");
        console.log(response);

        // db mein entry save krna hain
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message : "Image Successfully Uploaded",
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            success : false,
            message : "Something went wrong",
        });
    }
}


// video upload handler
exports.videoUpload = async (req,res) =>{
    try{
        // fetch data from request
        const {name, tags , email} = req.body;
        console.log(name," ",tags, " ", email, " ");

        const file = req.files.videoFile;

        // validation
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("FileType:- ",fileType);

        //TODO : add a upper limit of 5MB for Video
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

         // File format supported hain
        // upload on cloudinary KunalFolder
        const response = await uploadFileToCloudinary(file,"KunalFolder");
        console.log(response);

        // db mein entry save krna hain
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message : "Video Successfully Uploaded",
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            success : false,
            message : "Something went wrong",
        });
    }
}

exports.imageSizeReducer = async (req,res) => {
    try{
        // fetch data from request
        const {name, tags , email} = req.body;
        console.log(name," ",tags, " ", email, " ");
        
        // imageFile is the key in the request URL
        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("FileType:- ",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }
        // File format supported hain
        // upload on cloudinary
        const response = await uploadFileToCloudinary(file,"KunalFolder",30);
        console.log(response);

        // db mein entry save krna hain
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message : "Image Successfully Uploaded",
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            success : false,
            message : "Something went wrong",
        });
    }
}

// all logic should be written in post middleware hook
// for sending mail aitomatically
// nodemailer install
// create an instance of nodemailer
// create a transporter of nodemailer
// sent an email through transporter
