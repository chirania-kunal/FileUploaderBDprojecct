const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    imageUrl : {
        type : String,
    },
    tags : {
        type : String,
    },
    email: {
        type : String,
    }
});

// post hook 
fileSchema.post("save" , async function(doc){
    try{
        console.log("DOC: ", doc);

        // transporter
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth:{
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            },
        });

        // send mail
        let info = await transporter.sendMail({
            from : "chiraniacoder",
            to: doc.email,
            subject : "New File uplaoded on cloudinary",
            html : `<h2>Dear Sir </h2> <p>Your file has been successfully uploaded.<br>
            File Uploaded View here:  <a href ="${doc.imageUrl}">${doc.imageUrl}</a>  </p> `,
        })

        console.log("INFO :- ",info);
    }catch(error){
        console.error(error);

    }
})

const file = mongoose.model("file",fileSchema);
module.exports = file;