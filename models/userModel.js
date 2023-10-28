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
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    subBranch: {
      type: String,
    },
    branch: {
      type: String,
    },
    department: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    orders: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
