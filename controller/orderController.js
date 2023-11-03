import Item from "../models/itemModel.js";
import User from "../models/userModel.js";

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const orders = await Promise.all(
      req.body.map(async (order) => {
        const item = await Item.findById(order.itemId);
        let flag = false;
        user.orders.forEach((x) => {
          if (
            (user.role === "employee" || user.role.includes("head")) &&
            x.itemId.toString() === order.itemId &&
            x.status !== "completed"
          ) {
            flag = true;
          }
        });
        if (flag === true) {
          return {
            itemId: "duplicate",
          };
        }
        return {
          ...order,
          name: item.name,
          description: item.description,
          company: item.company,
          category: item.category,
          imageUrl: item.imageUrl,
        };
      })
    );
    console.log(orders);
    const updatedOrders = orders.filter(
      (order) => order.itemId !== "duplicate"
    );
    console.log(updatedOrders);
    user.orders.push(...updatedOrders);
    await user.save();
    if (req.body.length > updatedOrders.length) {
      return res.send({
        success: true,
        message: "Same item is not added, Rest are added",
      });
    }
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

export const updateOrder = async (req, res) => {
  try {
    const { storeManagerId, status } = req.body;
    const user = await User.findById(storeManagerId);
    user.orders.forEach((order, index) => {
      if (status) user.orders[index].status = status;
    });
    await user.save();
    res.send({
      success: true,
      message: "Orders Updated Successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export const updateSingleOrder = async (req, res) => {
  try {
    const { user_id, status, delivered } = req.body;
    const userId = user_id;
    const { orderId } = req.params;
    const user = await User.findById(userId);
    user.orders.forEach((order, index) => {
      if (order._id.toString() === orderId) {
        if (status) user.orders[index].status = status;
        if (delivered)
          user.orders[index].delivered = Math.min(
            user.orders[index].delivered + delivered,
            order.quantity
          );
      }
    });
    await user.save();
    res.send({
      success: true,
      message: "Orders Updated Successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
