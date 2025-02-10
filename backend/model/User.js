import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String , required: true }, 
    googleId: { type: String }, 
    displayName: { type: String },
    image: { type: String },
    isNewUser: { type: Boolean, default: false }
  },
  { timestamps: true } 
);

// Prevent model overwrite error
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
