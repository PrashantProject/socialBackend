import { Router } from "express";
import { signup , login, logout,uploadImage, uploadCover, addEducation} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";

  const router= Router();


  router.post("/signup", signup)
  router.post("/login", login)
  router.post("/logout",verifyToken, logout)
  router.post("/upload_image",verifyToken, upload.fields([
    {
      name:"image",
      maxCount:1
    }
   
  ]) , uploadImage)

  router.post("/upload_image",verifyToken, upload.fields([
    {
      name:"Coverimage",
      maxCount:1
    }
   
  ]) , uploadCover)


  router.put("/add_education",verifyToken, addEducation)
  

  export default router