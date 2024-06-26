import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";
import { allPost, create, myPost, Edit ,Delete } from "../controllers/post.controller.js";

const router= Router();

router.get("/", verifyToken, allPost)

router.post("/create",  verifyToken, upload.fields([{
    name:"file",
    maxCount:1
}]) , create)

router.get("/my-post", verifyToken , myPost)
router.put("/edit/:id",verifyToken,Edit )
router.delete("/:id", verifyToken, Delete)

export default router