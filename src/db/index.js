import mongoose from "mongoose";
import { DB_NAME } from "../constanc.js";
import dotenv from 'dotenv';




const databaseConnect= async()=>{
    try{
       const connectionInstance= await mongoose.connect(`${dotenv.env.MONGO_URI}/${DB_NAME}`)

    }catch(err){
         console.log("database connection errror : " , err);
    }
}

export default databaseConnect;