import mongoose from "mongoose";

const subSchema = new mongoose.Schema({
  item: {
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
  },
  status: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
  },
});

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
    orders: [subSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
