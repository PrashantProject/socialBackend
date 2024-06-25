import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import UserRouter from "./routes/user.routes.js"
import PostRouter from "./routes/post.routes.js"


const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(express.json());


app.use(express.static("public"))
app.use(cookieParser())

app.use("/user", UserRouter)
app.use("/post", PostRouter)



export default app;