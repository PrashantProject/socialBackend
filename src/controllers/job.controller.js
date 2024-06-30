import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.model.js";




const getAll = asyncHandler(async(req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const jobs = await Job.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

    const totalCount = await User.countDocuments();
    const totalPages = Math.ceil(totalCount / limit)
    const currentPage = page
    const Data = { "jobs": jobs, "totalpage": totalPages, "currentPage": currentPage }

    res.status(200).json(new ApiResponse(200, Data, "Job List "));

})


const singleJob= asyncHandler(async(req, res)=>{
    const jobID= req.params.id;
    if(!jobID){
        return res.status(404).json(new ApiError(404, "job not found"))
    }

    const job=await Job.findById(jobID).select("-applicant")

    if(!job){
        return res.status(404).json(new ApiError(404, "job not found"))
    }

    return res.status(200).json(new ApiResponse(200,job, "singale job" ))
    
})


const newJob= asyncHandler(async(req, res)=>{

})


const edit= asyncHandler(async(req, res)=>{

})


const deleteJob= asyncHandler(async(req, res)=>{

})

const apply= asyncHandler(async(req, res)=>{

})


export {getAll, singleJob, newJob, edit, deleteJob, apply}