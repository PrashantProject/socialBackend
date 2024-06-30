import mongoose, { Schema } from "mongoose";

const JobSchema=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },

    applicant:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }]

})

export const Job = mongoose.model("Job", JobSchema);

