import {v2 as cloud} from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config(); 

cloud.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadOnCloud= async(localFilePath)=>{
  
    try{
      if(!localFilePath){
        return null
      }
     
      const response= await cloud.uploader.upload(localFilePath)
      return response;
    }catch(error){
       console.log("faile to upload file on cloud", error)
       await fs.promises.unlink(localFilePath);
    }
}

export {uploadOnCloud}