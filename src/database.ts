import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Task");
  } catch (err: any) {
    throw new Error(`Error connecting to database: ${err.message}`);
  }
}

export default connectToDatabase;
