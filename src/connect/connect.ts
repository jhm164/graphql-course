import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  try {
    const mongoURI: string = process.env.MONGO_URI!;
    console.log("mongoURI=",mongoURI)
    await mongoose.connect(mongoURI, {});
    console.log("Connected Successfully");
  } catch (e) {
    console.log(e);
  }
};
