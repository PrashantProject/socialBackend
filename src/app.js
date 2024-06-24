import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser())

console.log(process.env.CORS_ORIGIN)
export default app;