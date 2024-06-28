import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken"
import mongoose, {Schema} from "mongoose";

const userSchema= new Schema({
     name:{
        type: String,
       required: true,
        trim:true
     },

     email:{
        type: String,
       required: true,
        unique: true,
        trim:true,
        lowecase:true
     },
    profileImage:{
        type:String
    },
    coverImage:{
        type:String
    },
    designation:{
        type:String,
    },
    location:{
        type:String
    },
    phone:{
        type:String
    },
    website:{
        type:String
    },
    connection: [
        {
            type:Schema.Types.ObjectId,
            ref:"Network"
        }
    ],

    education:[
        {
            type: String
        }
    ],

    password:{
        type:String,
        required:true
    }

}, {
    timestamps:true
})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password, 10)
    }
     next()
})

userSchema.methods.isCorrectPassword=async function(password){
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateJWT= async function(){
   return await jwt.sign({
        _id:this._id,
        emial:this.email,
        name:this.name
    },process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRY
    })
}


export const User= mongoose.model("User",userSchema)