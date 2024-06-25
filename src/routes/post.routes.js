import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";
import { allPost, create } from "../controllers/post.controller.js";

const router= Router();

router.get("/", verifyToken, allPost)

router.post("/create",  verifyToken, upload.fields([{
    name:"file",
    maxCount:1
}]) , create)

export default router