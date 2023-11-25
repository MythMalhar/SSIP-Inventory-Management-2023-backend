import Item from "../models/itemModel.js";
import User from "../models/userModel.js";
import transporter from "../config/mailerConfig.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlFilePath = path.join(__dirname, "tab.html");

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const bulkOrder = await Promise.all(
      req.body.map(async (order) => {
        const item = await Item.findById(order.itemId);
        return {
          ...order,
          masterPassword: order.masterPassword ? order.masterPassword : "none",
          name: item.name,
          description: item.description,
          company: item.company,
          category: item.category,
          imageUrl: item.imageUrl,
        };
      })
    );
    user.bulkOrders.push({ orders: bulkOrder });
    await user.save();

    //Mail code ......................................

    const lastOrders = user.bulkOrders[user.bulkOrders.length - 1].orders; //getting most recently placed order from bulkorders
    const createdAt = user.bulkOrders?.[user.bulkOrders.length - 1]?.createdAt; //getting time stamp from most recent order from bulkorders
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const dynamicData = {
      username: user.name,
      email: user.email,
      orders: lastOrders.map((order) => ({
        product: order.name,
        quantity: order.quantity,
      })),
    };

    // Build HTML content with dynamic data
    const htmlContent = `<html>

    <body>
      <h3 style="color: red;">Order Details</h3>
      <p>Name: ${dynamicData.username},</p>
      <p>Email: ${dynamicData.email},</p>
      <p>Date: ${date},</p>
      <p>Time: ${time},</p>    
      <table style="border-collapse: collapse; width: 80%; margin-top: 10px;">
        <thead>
          <tr style="background-color: #a5d6a7;">
            <th style="border: 1px solid #dddddd; padding: 8px; text-align: left; width: 20%;">Product Name</th>
            <th style="border: 1px solid #dddddd; padding: 8px; text-align: left; width: 20%;">Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${dynamicData.orders
            .map(
              (order, index) => `
            <tr style="background-color: ${
              index % 2 === 0 ? "#ffffff" : "#e6f7e1"
            };">
              <td style="border: 1px solid #dddddd; padding: 8px;">${
                order.product
              }</td>
              <td style="border: 1px solid #dddddd; padding: 8px;">${
                order.quantity
              }</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </body>
    
    </html>
    `;
    const mailOptions = {
      from: "malhargamezone@gmail.com", // Sender's email address
      to: user.email, // Recipient's email address
      subject: "Your order details.",
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
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
      message: "Orders Updated Successfully",
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
    console.log(123);
    const { user_id, status, delivered } = req.body;
    const userId = user_id;
    const { bulkOrderId } = req.params;
    const user = await User.findById(userId);
    console.log(user);
    let orderForMail;
    user.bulkOrders.forEach((bulkOrder, index) => {
      if (bulkOrder._id.toString() === bulkOrderId) {
        bulkOrder.orders.forEach((order, index2) => {
          // orderForMail = ;
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
    console.log(orderForMail);
    console.log("before save");
    await user.save();
    console.log("after save");

    //Mail code..........................................
    const dynamicData = {
      username: user.name,
      email: user.email,
      Status: status,
    };

    console.log("after dynamic data");

    const htmlContent = `
<html>
  <body>
    <h3 style="color: red;">Order Status</h3>
    <p>Name: ${dynamicData.username},</p>
    <p>Email: ${dynamicData.email},</p>
    <p>Your following order status is : ${dynamicData.Status},</p>
    <table style="border-collapse: collapse; width: 80%; margin-top: 10px;">
  </body>
</html>
`;
    const mailOptions = {
      from: "malhargamezone@gmail.com", // Sender's email address
      to: "bhavypjala3103@gmail.com ", // Recipient's email address
      subject: "Status of your order in inventory Management",
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

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
      message: "Orders Updated Successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
