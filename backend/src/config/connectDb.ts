import mongoose from "mongoose";

/**
 * @file connectDb
 * @author Jaseem
 * @description Connect to MongoDB database using Mongoose.
 * @returns {Promise<mongoose.Connection>} - A promise that resolves to the mongoose connection object.
 */
export const connectDB = async (uri: string) => {
  try {
    const con = await mongoose.connect(uri);

    console.log(`DB Connected ${con.connection.host}`);
  } catch (error: any) {
    error.message &&
      console.log(`Error When connecting to DB ${error.message}`);
    // throw new Error("Database connection failed");
    process.exit(1);
  }
};
