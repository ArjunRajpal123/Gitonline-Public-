import mongoose from "mongoose";


const connectDB = async () => {
  const connString: string = process.env.MONGODB || "";
  try {
    await mongoose.connect(connString);
    console.log("Connected to database");
  } catch {
    console.error("Failed to connect to database");
  }
};


export default connectDB;
