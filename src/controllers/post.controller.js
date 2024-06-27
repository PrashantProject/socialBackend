import { User } from "../models/user.model.js";
import { Post } from "../models/post.mode.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloud } from "../utils/cloudinary.js"
import fs from "fs";





const allPost = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const posts = await Post.find().populate('owner')
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

    const totalCount = await Post.countDocuments();
    const totalPages = Math.ceil(totalCount / limit)
    const currentPage = page
    const postData = { "post": posts, "totalpage": totalPages, "currentPage": currentPage }

    res.status(200).json(new ApiResponse(200, postData, "posts"));
})


const create = asyncHandler(async (req, res) => {
    const { discription } = req.body
    if (discription == null || discription.trim() == "") {
        return res.status(422).json(new ApiError(422, "discription is required"))
    }

    let cloudImageUrl = "";

    if (req.files) {
        if (req.files.file) {
            const imageLocalPath = req.files.file[0]?.path

            if (!imageLocalPath) {
                return res.status(422).json(
                    new ApiError(422, "image not found")
                )
            }
            const coludimage = await uploadOnCloud(imageLocalPath)
            await fs.promises.unlink(imageLocalPath);
            if (!coludimage) {
                return res.status(500).json(
                    new ApiError(500, "image not upload please try again")
                )
            }
            cloudImageUrl = coludimage.secure_url
        }


    }

    const post = await Post.create({
        owner: req.user._id,
        file: cloudImageUrl,
        discription
    })

    if (!post) {
        return res.status(500).json(new ApiError(500, "Please try Agai after some time"))
    }

    const postDtl = await Post.findById(post._id)
    return res.status(201).json(new ApiResponse(201, postDtl, "Post created succesfuly"))

})


const myPost = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const post = await Post.find({ owner: req.user._id })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

    const totalCount = await Post.countDocuments();
    const totalPages = Math.ceil(totalCount / limit)
    const currentPage = page
    const postData = { "post": post, "totalpage": totalPages, "currentPage": currentPage }

    res.status(200).json(new ApiResponse(200, postData, "posts"));

})



const Edit = asyncHandler(async (req, res) => {
    const { discription } = req.body
    const postID = req.params.id;
    if (discription == null || discription.trim() == "") {
        return res.status(422).json(new ApiError(422, "discription  is required"))
    }
    const update = await Post.findOneAndUpdate({ _id: postID },
        { $set: { discription: discription } }, { returnDocument: 'after' })
    if (!update) {
        return res.status(500).json(new ApiError(500, "please try again "))
    }
    const updated = await Post.findById(update._id).select("-password");
    return res.status(200).json(new ApiResponse(200, updated, "post added succesfuly"))
})


const Delete = asyncHandler(async (req, res) => {
    const postID = req.params.id;
    if(!postID){
         return res.status(422).json(422, "Invelid Parametres")
    }
    const post =Post.findById(postID)
    if(!post){
        return res.status(404).json(404, "post not found")
    }
    if(post.owner!=req.user._id){
        return res.status(403).json(404, "You are not authris to delet the post")
    }
    post.deleteOne();
    

    return res.status(200).json(200 ,new ApiResponse(200,{}, "post deleted succesfuly" ))
    
})





export { allPost, create, myPost, Edit, Delete }