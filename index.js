import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();
app.use(cors());
const connect = () => {
  mongoose
    .connect("mongodb+srv://tarunkc22ca:27tkcMongoDB@cluster0.muk3ggm.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/payments", paymentRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to Server");
});
