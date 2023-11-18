import Item from '../models/itemModel.js';
import User from '../models/userModel.js';
import transporter from '../config/mailerConfig.js';

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const bulkOrder = await Promise.all(
      req.body.map(async (order) => {
        const item = await Item.findById(order.itemId);
        return {
          ...order,
          masterPassword: order.masterPassword ? order.masterPassword : 'none',
          name: item.name,
          description: item.description,
          company: item.company,
          category: item.category,
          imageUrl: item.imageUrl,
        };
      })
    );
    user.bulkOrders.push({ orders: bulkOrder });
    
    const mailOptions = {
      from: "malhargamezone@gmail.com", // Sender's email address
      to: "malhargamezone@gmail.com", // Recipient's email address
      subject: "Your order details.",
      html: { path : "../models/table.html"},
    };

    const info = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    await user.save();
    res.send({
      success: true,
      message: 'Order created successfully',
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
      message: 'Fetched orders successfully',
      bulkOrders: user.bulkOrders,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
      bulkOrders: [],
    });
  }
};

export const updateAllOrders = async (req, res) => {
  try {
    const { storeManagerId, status } = req.body;
    const user = await User.findById(storeManagerId);
    user.orders.forEach((order, index) => {
      if (status) user.orders[index].status = status;
    });
    await user.save();
    res.send({
      success: true,
      message: 'Orders Updated Successfully',
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export const updateBulkOrder = async (req, res) => {
  try {
    const { user_id, status, delivered } = req.body;
    const userId = user_id;
    const { bulkOrderId } = req.params;
    const user = await User.findById(userId);
    user.bulkOrders.forEach((bulkOrder, index) => {
      if (bulkOrder._id.toString() === bulkOrderId) {
        bulkOrder.orders.forEach((order, index2) => {
          if (status) user.bulkOrders[index].orders[index2].status = status;
          if (delivered) {
            const lastDelivered =
              user.bulkOrders[index].orders[index2].delivered;
            user.bulkOrders[index].orders[index2].delivered =
              lastDelivered + delivered;
          }
        });
      }
    });
    await user.save();
    res.send({
      success: true,
      message: 'Orders Updated Successfully',
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
    const { bulkOrderId, orderId } = req.params;
    const user = await User.findById(userId);
    user.bulkOrders.forEach((bulkOrder, index) => {
      if (bulkOrder._id.toString() === bulkOrderId) {
        bulkOrder.orders.forEach((order, index2) => {
          if (order._id.toString() === orderId) {
            if (status) user.bulkOrders[index].orders[index2].status = status;
            if (delivered) {
              const lastDelivered =
                user.bulkOrders[index].orders[index2].delivered;
              user.bulkOrders[index].orders[index2].delivered =
                lastDelivered + delivered;
            }
          }
        });
      }
    });
    await user.save();
    res.send({
      success: true,
      message: 'Orders Updated Successfully',
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
