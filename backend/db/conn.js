import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();  // Ensure environment variables are loaded

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

export default mongoose;  
