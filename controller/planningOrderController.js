import Item from '../models/itemModel.js';
import User from '../models/userModel.js';
import transporter from '../config/mailerConfig.js';

export const createPlanningOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const planningOrder = await Promise.all(
      req.body.map(async (order) => {
        const item = await Item.findById(order.itemId);
        let flag = false;
        user.planningBulkOrders.planningOrders.forEach((x, index) => {
          if (x.itemId.toString() === order.itemId) {
            user.planningBulkOrders.planningOrders[index].quantity +=
              +order.quantity;
            flag = true;
          }
        });
        if (flag === true)
          return {
            itemId: 'duplicate',
          };
        return {
          ...order,
          name: item.name,
          description: item.description,
          company: item.company,
          category: item.category,
          imageUrl: item.imageUrl,
          price: item.price,
        };
      })
    );
    const updatedPlanningOrder = planningOrder.filter(
      (order) => order.itemId !== 'duplicate'
    );
    user.planningBulkOrders.planningOrders.push(...updatedPlanningOrder);
    user.planningBulkOrders.status = 'pending';
    await user.save();
    /*
    const mailOptions = {
      from: "malhargamezone@gmail.com", // Sender's email address
      to: user.email, // Recipient's email address
      subject: "Your order details.",
      text: updatedOrders.toString(),
    };

    const info = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    */
    res.send({
      success: true,
      message: 'Planning Order created successfully',
      planningBulkOrders: user.planningBulkOrders,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export const fetchAllPlanningOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    res.send({
      success: true,
      message: 'Fetched planning orders successfully',
      planningBulkOrders: user.planningBulkOrders,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
      planningBulkOrders: {},
    });
  }
};

export const updatePlanningOrder = async (req, res) => {
  try {
    const { userId, updatedQuantity, planningOrderId, status } = req.body;
    const user = await User.findById(userId);
    if (updatedQuantity && planningOrderId) {
      user.planningBulkOrders.planningOrders.forEach((order, index) => {
        if (order._id.toString() === planningOrderId) {
          user.planningBulkOrders.planningOrders[index].quantity =
            updatedQuantity;
        }
      });
    }
    if (status) {
      user.planningBulkOrders.status = status;
    }
    await user.save();
    res.send({
      success: true,
      message: 'Planning orders updated successfully.',
      planningBulkOrders: user.planningBulkOrders,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
      planningBulkOrders: {},
    });
  }
};

export const deletePlanningOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const { planningOrderId } = req.params;
    const user = await User.findById(userId);
    const updatedPlanningOrders = user.planningBulkOrders.planningOrders.filter(
      (order) => order._id.toString() !== planningOrderId
    );
    user.planningBulkOrders.planningOrders = updatedPlanningOrders;

    await user.save();

    res.send({
      success: true,
      message: 'Planning order deleted successfully',
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
