import { Users } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { emailVerification } from "../utils/nodemailer.js";
import { generateOTP } from "../utils/otpSender.js";
import { Otp } from "../models/otp.models.js";
import { apiResponse } from "../utils/apiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js"

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_TOKEN, { expiresIn: "15d" });
};

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    throw new apiError(400, "All fields are required")
  }
  const existUser = await Users.findOne({ email })
  
  if (existUser) {
    throw new apiError(400, "Email already registered")

  }

  const generateOtp = generateOTP()
  console.log("OTP")
  if (!generateOtp) {
    throw new apiError(400, "otp send failed");
  }

  //send otp to user email
  await emailVerification(generateOtp, name, email);

  const otpSend = await Otp.create({
    email,
    otp: generateOtp,
  });
  return res.status(200).json(
   new apiResponse(200, otpSend, "OTP send successfully" )
 )
})

const otpVerification = asyncHandler(async (req, res) => {

    const { name, email, password, role, otp } = req.body;
      if (!otp) {
        throw new apiError(400, "OTP required")
      }

  const validOtp = await Otp.findOne({ email}).sort({createdAt: - 1});

  if (validOtp.otp !== otp) {
    throw new apiError(400, "Invalid and expire OTP")
  }
  
  const user = await Users.create({
    name,
    email,
    password,
    role,
    isVerified: true,
  });
 
  await Otp.deleteMany({ email })
  
  const createdUser = await Users.findById(user._id).select("-password");

  if (!createdUser) {
    throw new apiError(500, "something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "user register successfully"));
})



export {
  userRegister,
  otpVerification
}