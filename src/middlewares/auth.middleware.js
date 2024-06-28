import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js"


const verifyToken=asyncHandler(async(req, res, next)=>{
      const token= req.cookies?.token || req.header("Authorization")?.replace("Bearer","")
      
      
      if(!token){
        return res.status(401).json(new ApiError(401, "Unauthorized"))
      }
      try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifiedToken) {
            return res.status(401).json(new ApiError(401, "Invalid token"));
        }

        const user = await User.findById(verifiedToken._id).select("-password");
        
        if (!user) {
            return res.status(401).json(new ApiError(401, "Invalid user"));
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json(new ApiError(401, `Token verification failed: ${error.message}`));
    }

})

export default verifyToken;