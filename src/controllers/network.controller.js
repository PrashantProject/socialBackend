import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";

import { User } from "../models/user.model.js";
import { Network }  from "../models/network.model.js"


const peopleList=asyncHandler(async(req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const users = await User.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

    const totalCount = await User.countDocuments();
    const totalPages = Math.ceil(totalCount / limit)
    const currentPage = page
    const Data = { "user": users, "totalpage": totalPages, "currentPage": currentPage }

    res.status(200).json(new ApiResponse(200, Data, "People List "));
})


const sendRequest= asyncHandler(async(req, res)=>{
    const {receiverID}=req.body
    if(!receiverID){
        return res.status(422).json(new ApiError(422, "Receiver Id is required"))
    }
    if(receiverID.trim()==""){
        return res.status(422).json(new ApiError(422,"Receiver Id is required"))
    }
    
    const isHaveRequest= await Network.find({
        $or: [
          { sender: req.user._id, receiver: receiverID },
          { sender: receiverID, receiver: req.user._id }
        ]
      })
    if(isHaveRequest){
        return res.status(403).json(new ApiError(403, "Your request has already been sent"))
    }

    const newRequest= await Network.create({
        sender:req.user._id,
        recever:receiverID
    })

    if(!newRequest){
        return res.status(500).json(500,"request failed please try again")
    }

    return res.status(201).json(new ApiResponse(201, "Request sent successfully"))

})


const pendingRequest=asyncHandler(async(req,res)=>{

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