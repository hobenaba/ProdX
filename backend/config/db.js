import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("Successfully connected on : ", conn.connection.host);
  } catch (error) {
    console.error("Database connection failed : ", error.message);
  }
};
