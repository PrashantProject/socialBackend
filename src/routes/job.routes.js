import verifyToken from "../middlewares/auth.middleware.js";
import { Router } from "express";
import {getAll, singleJob, newJob, edit, deleteJob, apply} from "../controllers/job.controller.js"

const router= Router();

router.get("/", verifyToken ,getAll)
router.get("/:id", verifyToken ,singleJob)

router.post("/", verifyToken ,newJob)



export default router