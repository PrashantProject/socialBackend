import {Chat} from "../models/chat.models.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";




const chats= asyncHandler(async(req, res)=>{
    chats= await Chat.findById(req.user._id);
    if(!chats){
        return res.status(204).json(new ApiError(204, "chat not found"))
    }
    return res.status(200).json(new ApiResponse(200 , chats, "chat lists"))
})


export {chats}