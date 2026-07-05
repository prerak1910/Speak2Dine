import mongoose from "mongoose";

/**
 * Establishing connection to MongoDB using Mongoose
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected successfully`);
  } catch (error) {
    // Log the specific error
    console.error(`Error connectiong to MongoDB: ${error.message}`);

    // Shut down the application if the database connection fails
    process.exit(1);
  }
};

export default connectDB;
