import { hash } from "bcrypt";
import mongoose, {Schema} from "mongoose";

const userSchema= new Schema({
     name:{
        require:true,
        type:String,
        trim:true
     },

     email:{
        require:true,
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

    connection: [
        {
            type:Schema.Types.ObjectId,
            ref:Network
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
    if(this.isModefied("password")){
        this.password=await bcrypt,hash(this.password, 10)
    }
     next()
})

userSchema.method.isCorrectPassword=async function(password){
    return await bcrypt.compare(password,this.password)
}


userSchema.method.generateJWT= async function(){
   return await jwt.sign({
        _id:this._id,
        emial:this.email,
        name:this.name
    },process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRY
    })
}


export const User= mongoose.model("User",userSchema)