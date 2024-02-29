import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoute from "../src/Routes/UserRoutes";
mongoose.connect(process.env.DATABASE as string).then(() => {
  console.log("Connected to database!");
});
const app = express();
app.use(express.json());
app.use(cors());

app.get("/health",async(req:Request,res:Response)=>{
  res.send({message:"health OK!"})
})

app.use("/api/my/user", UserRoute);
app.listen(7001, () => {
  console.log(`Server is running on port 7001`);
});
