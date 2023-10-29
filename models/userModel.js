import mongoose, { Schema } from "mongoose";

const subSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    delivered: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

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
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    orders: [subSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
