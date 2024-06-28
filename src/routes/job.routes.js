import verifyToken from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router= Router();

router.get("/", verifyToken ,getAll)



export default router