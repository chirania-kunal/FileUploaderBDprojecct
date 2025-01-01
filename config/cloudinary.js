// install npm i cloudinary
// importing cloudinary and its  latest version is v2
const  cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = ()=>{
    try{
        // using config method in cloudinary we can set up connection with cloudinary
        // config method parameters are(cloud name , API KEY , API SECRET) and these parameters has to be set up in env file
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key : process.env.API_KEY,
            api_secret : process.env.API_SECRET,
        })
    }catch(error){
        console.log(error);
    }
}

// login to cloudinary.com
// go to bottom left settings API_KEY 