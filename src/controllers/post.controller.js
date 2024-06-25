import { User } from "../models/user.model.js";
import {Post} from  "../models/post.mode.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloud} from "../utils/cloudinary.js"
import fs from "fs";
import { constants } from "buffer";




const allPost=asyncHandler(async(req, res)=>{
     const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; 

        const posts = await Post.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        const totalCount = await Post.countDocuments();
        const totalPages= Math.ceil(totalCount / limit)
        const currentPage= page

        res.status(200).json(new ApiResponse(200,posts, "posts" ));
})


const create = asyncHandler(async(req, res)=>{
      const {discription} = req.body
      if(discription==null || discription.trim()==""){
        return res.status(422).json(new ApiError(422, "discription is required"))
      }

    let cloudImageUrl = "";

    if(req.files ){
        if(req.files.file){
            const imageLocalPath= req.files.file[0]?.path

            if(!imageLocalPath){
               return res.status(422).json(
                   new ApiError(422, "image not found")
               )
            }
           const coludimage= await uploadOnCloud(imageLocalPath)
           await fs.promises.unlink(imageLocalPath);
           if(!coludimage){
               return res.status(500).json(
                   new ApiError(500, "image not upload please try again")
               ) 
           }
           cloudImageUrl=coludimage.secure_url
        }
       
    
   }

   const post=await Post.create({
    owner:req.user._id,
    file:cloudImageUrl,
    discription
   })

   if(!post){
    return res.status(500).json(new ApiError(500, "Please try Agai after some time"))
   }

   const postDtl= await Post.findById(post._id)
   console.log(postDtl)
   return res.status(201).json(new ApiResponse(201, postDtl, "Post created succesfuly" ))
      
})


export {allPost, create}