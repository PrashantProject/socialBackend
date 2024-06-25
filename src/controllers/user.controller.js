import { User } from "../models/user.model.js";
import { upload } from "../middlewares/multer.middleware.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";





const signup= asyncHandler (async(req, res)=>{

    
    const {name, email,password}=req.body;
   
    if(name.trim()=="" || name==null || email==null || email.trim()=="" || password==null || password.trim()==""){
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
    return res.status(401).json(new ApiError(401, "Please enter correct credentials"));
   }
   const token= await user.generateJWT()
    if(!token){
        return res.status(500).json( new ApiError(500, "Please try again"))
    }

    const userDtl= await User.findById(user._id).select("-password")
    const option={
        httpOnly:true,
        secure:true
    }
    return res.status(200).cookie("token",  token, option).json(
           new ApiResponse(200,{"user":userDtl, "token":token}, "Loggedin successfuly" )
    )
   
})


const uploadImage=()=>{

}

const uploadCover=()=>{

}


const addEducation=()=>{

}





export {signup, login, uploadImage, uploadCover, addEducation}