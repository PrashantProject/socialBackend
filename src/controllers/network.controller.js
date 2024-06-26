import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";

import { User } from "../models/user.model.js";


const peopleList=asyncHandler(async(req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const users = await User.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

    const totalCount = await Post.countDocuments();
    const totalPages = Math.ceil(totalCount / limit)
    const currentPage = page
    const Data = { "user": users, "totalpage": totalPages, "currentPage": currentPage }

    res.status(200).json(new ApiResponse(200, Data, "People List "));
})


const sendRequest= asyncHandler(async(req, res)=>{

})


const acceptRequest= asyncHandler(async(req, res)=>{

})


const rejectRequest=asyncHandler(async(req, res)=>{

})

const myNetwork=asyncHandler(async(req, res)=>{

})

const unFolow= asyncHandler(async(req, res)=>{

})

export {peopleList, sendRequest, acceptRequest, rejectRequest, myNetwork, unFolow}