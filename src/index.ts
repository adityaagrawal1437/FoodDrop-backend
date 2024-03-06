import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoute from "./Routes/UserRoutes";
import RestaurantRoute from "./Routes/RestaurantRoutes";

import SearchRestaurantRoute from "./Routes/SearchRestaurantRoutes";
import OrderRoute from "./Routes/OrderRoutes";
import { v2 as cloudinary } from "cloudinary";
mongoose.connect(process.env.DATABASE as string).then(() => {
  console.log("Connected to database!");
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();

app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", UserRoute);
app.use("/api/my/restaurant", RestaurantRoute);
app.use("/api/restaurant", SearchRestaurantRoute);
app.use("/api/order", OrderRoute);
app.listen(7001, () => {
  console.log(`Server is running on port 7001`);
});
