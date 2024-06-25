import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js"


const verifyToken=asyncHandler(async(req, res, next)=>{
      const token= req.cookies?.token || req.header("Authorization")?.replace("Bearer","")
      if(!token){
        return res.status(401).json(new ApiError(401, "Unauthorized"))
      }

     const verifedToken= await jwt.verify(token,process.env.JWT_SECRET)
     const user = await User.findById(verifedToken._id).select("-password")
      if(!user){
        return res.status(401,"Invelid Token")
      }

      req.user=user;
      next();

})

export default verifyToken;