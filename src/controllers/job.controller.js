import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.model.js";




const getAll = asyncHandler(async(req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const jobs = await Job.find().select("-applicant").populate('owner', 'name email')
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
      const {title,company, location, discription, }=req.body;
      if(title==null || company==null, location==null, discription==null){
       return res.status(422, "title, company, location, discription  are reqierd");
      }
      if(title.trim()=="" || company.trim()=="", location.trim()=="", discription.trim()==""){
        return res.status(422, "title, company, location, discription  are reqierd");
       }

     const job = await Job.create({
        title,company, location, discription,
     })

     if(!job){
        return res.status(500).json(new ApiError(500, "Failed Please Try Again"))
     }
     const jobData= await Job.findById(job._id).select("-applicant");

     return res.status(201).json(new ApiResponse(201, jobData, "Job Created Succesfuly"))
})







const edit= asyncHandler(async(req, res)=>{
     const jobID= req.params.id;
     if(!jobID){
        return res.status(422).json(new ApiError(422, "wrong parameter"))
     }
    const {title,company, location, discription }=req.body;
    if(title==null || company==null, location==null, discription==null){
     return res.status(422, "title, company, location, discription  are reqierd");
    }
    if(title.trim()=="" || company.trim()=="", location.trim()=="", discription.trim()==""){
      return res.status(422, "title, company, location, discription  are reqierd");
     }

     const job =await Job.findById(jobID);
     job.title=title
     job.company=company
     job.location=location
     job.discription=discription
     job.save();

     const jobData= await Job.findById(job._id).select("-applicant");

     return res.status(200).json(new ApiResponse(200, jobData ,"Job Upated Sucessefuly" ))
})









const deleteJob= asyncHandler(async(req, res)=>{
   const {jobID}=req.params.id
   if(!jobID){
    return res.status(422).json(new ApiError(422, "wrong perameters"))
   }

   const job = await Job.findById(jobID);
   if(!job){
    return res.status(404).json(404, "job not found !")
   }

   if(req.user._id!=job.owner){
    return res.status(403).json(new ApiError(403, "Ununauthorized"))
   }

   job.deleteOne();

   return res.status(200).json(new ApiResponse(200, {}, "job deleted sucessefuly"))
})







const apply= asyncHandler(async(req, res)=>{
    const {jobID}=req.params.id
   if(!jobID){
    return res.status(422).json(new ApiError(422, "wrong perameters"))
   }

   const job = await Job.findById(jobID);
   if(!job){
    return res.status(404).json(404, "job not found !")
   }

   job.applicant=req.user._id;
   job.save();

   return res.status(200).json(200, {}, "job applied successfully")
})








const myJob=asyncHandler(async(req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const jobs = await Job.find({ owner: req.user._id })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

    const totalCount = await User.countDocuments();
    const totalPages = Math.ceil(totalCount / limit)
    const currentPage = page
    const Data = { "jobs": jobs, "totalpage": totalPages, "currentPage": currentPage }

    res.status(200).json(new ApiResponse(200, Data, "Job List "));
})




export {getAll, singleJob, newJob, edit, deleteJob, apply, myJob}