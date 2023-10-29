import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import ROLES from "../constants/ROLES.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("authorization").split(" ")[1];
    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = decryptedToken.userId;
    next();
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export const authMiddlewareAdmin = async (req, res, next) => {
  try {
    const token = req.header("authorization").split(" ")[1];
    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = decryptedToken.userId;
    const user = await User.findById(req.body.userId);
    if (user.role !== ROLES.ADMIN) throw new Error("You are not Authorized");
    next();
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export const authMiddlewareManager = async (req, res, next) => {
  try {
    const token = req.header("authorization").split(" ")[1];
    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = decryptedToken.userId;
    const user = await User.findById(req.body.userId);
    if (!user.role.includes("manager")) throw new Error("You are not Authorized");
    next();
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export const authMiddlewareHead = async (req, res, next) => {
  try {
    const token = req.header("authorization").split(" ")[1];
    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = decryptedToken.userId;
    const user = await User.findById(req.body.userId);
    if (!user.role.includes("head")) throw new Error("You are not Authorized");
    next();
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
