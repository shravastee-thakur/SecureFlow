import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";

import userRoutes from "./routes/userRoutes.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
app.use(limiter);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, //remove unnecessary headers
  })
);

//Routes
app.use("/api/v1/user", userRoutes);

export default app;
