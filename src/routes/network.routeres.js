import {peopleList, sendRequest, acceptRequest, rejectRequest, myNetwork, unFolow} from "../controllers/network.controller.js"
import verifyToken from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router= Router();


router.get("/list", verifyToken , peopleList)


export default router