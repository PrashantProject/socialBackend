import {peopleList, sendRequest, acceptRequest, rejectRequest, myNetwork, unFolow, pendingRequest} from "../controllers/network.controller.js"
import verifyToken from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router= Router();


router.get("/list", verifyToken , peopleList)
router.post("/send-request", verifyToken, sendRequest)
router.get("/pending-request", verifyToken, pendingRequest)


export default router