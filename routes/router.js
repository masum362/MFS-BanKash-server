import express from "express";
import { homePage, loginUser, registerUser ,getUser} from "../controllers/auth-controller.js";
import { auth } from "../utils/private.js";

const router = express.Router();

router.get("/", homePage);
router.get("/get-user",auth,getUser);
router.post("/register",registerUser)
router.post("/login",loginUser)


export default router;