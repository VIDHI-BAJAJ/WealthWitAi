import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    displayName: { type: String, required: true }, // Required field
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String },
    image: { type: String },
    isNewUser: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Prevent model overwrite error
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;