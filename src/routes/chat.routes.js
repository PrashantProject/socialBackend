import verifyToken from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { chats } from "../controllers/chat.controller.js";

const router= Router();

router.get('/', verifyToken, chats)


export default router