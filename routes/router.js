import express from "express";
import { homePage, loginUser, registerUser } from "../controllers/auth-controller.js";

const router = express.Router();

router.get("/", homePage);
router.post("/register",registerUser)
router.post("/login",loginUser)


export default router;