import app from "./app.js";
import databaseConnect from "./db/index.js";
import dotenv from 'dotenv';
dotenv.config();


databaseConnect()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log("app started");
    })
})
.catch((err)=>{
    console.log("database connection error", err)
})

