import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ROLES from "../constants/ROLES.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) throw new Error("User already exists");
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.send({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Fill all data");
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid Password");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: "User Logged in successfully",
      token,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    let { role, branch, subBranch, department } = req.body;
    let users;
    if (role === ROLES.ADMIN) {
      users = await User.find();
    } else {
      users = await User.find({
        role,
        branch,
        subBranch,
        department,
      });
    }

    console.log(users);
    if (!users) {
      throw new Error("No users found");
    }
    console.log(users);
    res.send({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
      users: [],
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    delete user.password;
    if (!user) {
      res.send({
        success: true,
        message: "Error occurred in fetching user.",
      });
    }
    res.send({
      success: true,
      message: "User fetched Successfully",
      user,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export const newPassword = async (req, res) => {
  try {
    const { email_id, newPassword } = req.body;
    if (!email_id || !newPassword) {
      throw new Error("Fill all fields");
    }
    const user = await User.findById(email_id);
    if (!user) {
      throw new Error("User doesnt exists.");
    }
    user.password = newPassword;
    await user.save();
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
