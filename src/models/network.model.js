import mongoose , {Schema} from "mongoose";


const NetworkSchema= new Schema({
       sender:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:"User"
       },

       recever:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:"User"
       },

       accepted_at:{
          type: Date
       },

       rejected_at:{
        type:Date
       },

       created_at:{
           type:Date,
           default: Date.now
       }
})



export const Network = mongoose.model("Network", NetworkSchema);