// Updated
import express from "express";
import { signup, signin, googleAuth } from "../controllers/auth.js";
const router = express.Router();
import stripeModule from "stripe";
const stripe = stripeModule("1AXCvIa1N51mbN4ujIZxXn03");

//CREATE A USER
router.post("/signup", signup);
//SIGNIN
router.post("/signin", signin);
//GOOGLE AUTH
router.post("/google", googleAuth);

export default router;
