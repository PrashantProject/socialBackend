import { User } from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloud} from "../utils/cloudinary.js"
import fs from "fs";





const signup= asyncHandler (async(req, res)=>{

    
    const {name, email,password}=req.body;
   
    if( name==null || email==null || password==null ){
        return res.status(422).json(new ApiError(422, "name , email and password are required"));
    }
    if(name.trim()=="" || email.trim()=="" || password.trim()==""){
        return res.status(422).json(new ApiError(422, "name , email and password are required"));
    }
   const user=  await User.findOne({email});
    if(user){
        return res.status(400).json(new ApiError(400, "Email already exists"));
    }
    const newuser= await User.create({
        name,
        email,
        password
    })
   
    if (!newuser) {
        return res.status(500).json(new ApiError(500, "Failed to create user, please try again"));
    }

    const createdUser = await User.findById(newuser._id).select("-password");

    if (!createdUser) {
        return res.status(500).json(new ApiError(500, "Failed to retrieve created user, please try again"));
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
  
})



const login= asyncHandler (async(req, res)=>{
    const {email,password}=req.body;
   
    if(email==null || email.trim()=="" || password==null || password.trim()==""){
        return res.status(422).json(new ApiError(422, "email and password are required"));
    }
   const user=  await User.findOne({email});
    if(!user){
        return res.status(404).json(new ApiError(404, "please enter correct credentials"));
    }

   const isCorrectPassword=await user.isCorrectPassword(password)
   if(!isCorrectPassword){
    return res.status(422).json(new ApiError(422, "Please enter correct credentials"));
   }
   const token= await user.generateJWT()
    if(!token){
        return res.status(500).json( new ApiError(500, "Please try again"))
    }

    const userDtl= await User.findById(user._id).select("-password")
    const option={
        httpOnly:false,
        secure:false,
        expires: new Date(Date.now()+10000)
    }
    return res.status(200).cookie("token",  token, option).json(
           new ApiResponse(200,{"user":userDtl, "token":token}, "Loggedin successfuly" )
    )
   
})


const logout=asyncHandler(async(req, res)=>{
    const option={
        httpOnly:true,
        secure:true
    }
      res.status(200).clearCookie("token",option).json(
        new ApiResponse(200, {},"Logout Successfuly")
      )
})

const uploadImage=asyncHandler(async(req, res)=>{
      
    
     const imageLocalPath= req.files.image[0]?.path

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
    await User.findOneAndUpdate({_id:req.user._id},
        { $set: { profileImage: coludimage.secure_url }},
        { returnDocument: 'after' }
    )
    const updatedUser = await User.findById(req.user._id).select("-password");

    return res.status(200).json(new ApiResponse(200, updatedUser, "image uploaded successfuly"))

})

const uploadCover=asyncHandler( async(req, res)=>{
    const imageLocalPath= req.files.Coverimage[0]?.path

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
   await User.findOneAndUpdate({_id:req.user._id},
       { $set: { coverImage: coludimage.secure_url }},
       { returnDocument: 'after' }
   )
   const updatedUser = await User.findById(req.user._id).select("-password");

  
   return res.status(200).json(new ApiResponse(200, updatedUser, "image uploaded successfuly"))
})


const addEducation=asyncHandler( async(req, res)=>{
        const {education}= req.body
        if(education==null || education.trim()==""){
            return res.status(422).json(new ApiError(422, "Education  is required"))
        }
 const update= await User.findOneAndUpdate({_id:req.user._id},
    {$set:{education:education}},{ returnDocument: 'after'})
  if(!update){
    return res.status(500).json(new ApiError(500, "please try again "))
  }
  const updatedUser = await User.findById(req.user._id).select("-password");
  return res.status(200).json(new ApiResponse(200,updatedUser,"educatioon added succesfuly"))
})





export {signup, login, uploadImage, uploadCover, addEducation, logout}