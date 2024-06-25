import {v2 as cloud} from "cloudinary";
import fs from "fs";


cloud.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
})

const uploadOnCloud= async(localFilePath)=>{
    try{
      if(!localFilePath){
        return null
      }
      const response= await cloud.uploader.upload(localFilePath)
      return response;
    }catch(error){
       console.log("faile to upload file on cloud")
    }
}

export {uploadOnCloud}