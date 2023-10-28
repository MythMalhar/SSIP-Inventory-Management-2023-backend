import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
