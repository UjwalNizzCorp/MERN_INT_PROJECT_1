import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB Connected ${con.connection.host}`);
    return con;
  } catch (error) {
    console.log(`Error When connecting to DB ${error.message}`);
    throw new Error("Database connection failed");
    // process.exit(1);
  }
};
