import Item from "../models/itemModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const orders = await Promise.all(
      req.body.map(async (order) => {
        const item = await Item.findById(order.itemId);
        return { ...order, ...item._doc };
      })
    );
    console.log(orders);
    user.orders.push(...orders);
    await user.save();
    res.send({
      success: true,
      message: "Order created successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export const fetchAllOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    res.send({
      success: true,
      message: "Fetched orders successfully",
      orders: user.orders,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
      orders: [],
    });
  }
};
