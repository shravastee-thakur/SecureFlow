import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { deleteUser, getUsers } from "../controllers/adminController.js";
import allowRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/getUser", authenticate, allowRole("admin"), getUsers);
router.delete("/getUser/:id", authenticate, allowRole("admin"), deleteUser);

export default router;
