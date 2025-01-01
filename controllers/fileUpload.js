const File = require("../models/File");

// localfileUpload -> handler function -  fetch any media from client given path and store that media at server specific path.
exports.localFileUpload = async (req,res)=>{
    try{
        // fetching file from request URL
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