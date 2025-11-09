import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // No longer required, because of Google Auth
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple users to be null, but enforces unique for those who have it
    },
    purchasedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project", // This 'ref' points to your new 'Project' model
      },
    ],
  },
  { timestamps: true, minimize: false }
);

const User = mongoose.model("User", userSchema);

export default User;