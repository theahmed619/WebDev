import './config/dotenvConfig.js';
import express from "express";

import connectDb from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cloudinaryRoutes from "./routes/cloudinaryRoute.js";
import blogRoutes from "./routes/blogRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";



const app = express();
const port =process.env.PORT || 8000

// using middleware
app.use(express.json());
app.use(cors());

//using routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(port,()=>{
    console.log("Hello From Server")
    connectDb()
})
