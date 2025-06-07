import express from "express";

import {
  loginStepOne,
  logout,
  refreshTokenHandler,
  register,
  verifyLoginOtp,
} from "../controllers/userController.js";

import {
  loginSchema,
  registerSchema,
  otpVerificationSchema,
} from "../validation/joiValidation.js";

const router = express.Router();

router.post("/register", registerSchema, register);
router.post("/login", loginSchema, loginStepOne);
router.post("/login/verify", otpVerificationSchema, verifyLoginOtp);
router.post("/logout", logout);
router.post("/refresh", refreshTokenHandler);

export default router;
