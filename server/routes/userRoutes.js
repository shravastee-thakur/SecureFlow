import express from "express";
import {
  login,
  logout,
  refreshTokenHandler,
  register,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshTokenHandler);

export default router;
