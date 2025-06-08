import express from "express";

import {
  changePassword,
  forgotPasswordRequest,
  loginStepOne,
  logout,
  refreshTokenHandler,
  register,
  resetPassword,
  verifyLoginOtp,
} from "../controllers/userController.js";

import {
  loginSchema,
  registerSchema,
  otpVerificationSchema,
  resetPasswordRequestSchema,
  resetPasswordSchema,
} from "../validation/joiValidation.js";

import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerSchema, register);
router.post("/login", loginSchema, loginStepOne);
router.post("/login/verify", otpVerificationSchema, verifyLoginOtp);
router.post("/logout", logout);
router.post("/refresh", refreshTokenHandler);
router.post("/changePassword", authenticate, changePassword);
router.post(
  "/forgotPassword",
  resetPasswordRequestSchema,
  forgotPasswordRequest
);
router.post("/resetPassword", resetPasswordSchema, resetPassword);

export default router;
