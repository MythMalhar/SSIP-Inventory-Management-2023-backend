import User from "../models/userModel.js";

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    user.orders.push({ ...req.body });
    await User.findByIdAndUpdate(userId, user);
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
