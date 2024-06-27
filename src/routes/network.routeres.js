import {peopleList, sendRequest, acceptRequest, rejectRequest, myNetwork, unfollow, pendingRequest} from "../controllers/network.controller.js"
import verifyToken from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router= Router();


router.get("/list", verifyToken , peopleList)
router.post("/send-request", verifyToken, sendRequest)
router.get("/pending-request", verifyToken, pendingRequest)
router.post("/accept-request", verifyToken, acceptRequest)
router.post("/reject-request", verifyToken, rejectRequest)
router.get("/my-network", verifyToken, myNetwork)
router.post("/unfollow", verifyToken, unfollow)


export default router