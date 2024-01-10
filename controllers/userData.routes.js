const {v2 : cloudinary} = require("cloudinary") ;
const fs = require("fs")
const express = require("express");
const multer = require("multer");
const {UserDataModel} = require("../models/userData.model");

require("dotenv").config();
const userDataRouter = express.Router();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret:process.env.API_SECRET 
  });
  
const storage = multer.diskStorage({

  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

userDataRouter.post("/upload", upload.single("photo"), async(req, res) => {
const {name,age,address,userID="userID"} = req.body 

  let localFilePath = req.file.path;
  try{
    if(!localFilePath) return res.send(null);
    const response = await cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
    })


  const userData = new UserDataModel({name,age ,address,userID,photo:response.url});

  await userData.save();

   const userDetails = await UserDataModel.find({userID:userID});
 
   res.send({message:userDetails[userDetails.length-1]});

  }catch(err){
   fs.unlinkSync(localFilePath);
  res.send({err})
  }

});

module.exports = {
  userDataRouter,
};
