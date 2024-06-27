import mongoose, { Schema } from "mongoose";

const PostSchema= new Schema({
   owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
   },

   file:{
    type:String
   },

   discription:{
    type:String,
    required:true
   },

   like:[{
    type:Schema.Types.ObjectId,
    ref:"User"
   }]
},{
   timestamps:true
})


export const Post=mongoose.model("Post", PostSchema);