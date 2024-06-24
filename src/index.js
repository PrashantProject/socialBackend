import express from "express";
import databaseConnect from "./db/index.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();



app.get('/',(req, res)=>{
    return res.send('enter in app');
})




app.listen(process.env.PORT,()=>{
    console.log('app start')
})