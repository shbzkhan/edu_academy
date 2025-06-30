import Router from "express";
import { otpVerification, userRegister } from "../controllers/user.controllers.js";



const router = Router()

router.route("/register").post(userRegister)
router.route("/verify").post(otpVerification)

export default router