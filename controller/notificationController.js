import ROLES from "../constants/ROLES.js";
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";
import transporter from "../config/mailerConfig.js";

export const createNotification = async (req, res) => {
  try {
    let { userId, receiverId, message, up } = req.body;
    const currentUser = await User.findById(userId);
    const senderName = currentUser.name;

    if (!receiverId) {
      let filters = {};
      if (currentUser.role === ROLES.EMPLOYEE) {
        filters = {
          role: ROLES.SUB_BRANCH_STORE_MANAGER,
          subBranch: currentUser.subBranch,
          branch: currentUser.branch,
          department: currentUser.department,
        };
      } else if (currentUser.role === ROLES.SUB_BRANCH_HEAD) {
        if (up) {
          filters = {
            role: ROLES.BRANCH_STORE_MANAGER,
            branch: currentUser.branch,
            department: currentUser.department,
          };
        } else {
          filters = {
            role: ROLES.SUB_BRANCH_STORE_MANAGER,
            subBranch: currentUser.subBranch,
            branch: currentUser.branch,
            department: currentUser.department,
          };
        }
      } else if (currentUser.role === ROLES.BRANCH_HEAD) {
        if (up) {
          filters = {
            role: ROLES.DEPARTMENT_STORE_MANAGER,
            department: currentUser.department,
          };
        } else {
          filters = {
            role: ROLES.BRANCH_STORE_MANAGER,
            branch: currentUser.branch,
            department: currentUser.department,
          };
        }
      } else if (currentUser.role === ROLES.DEPARTMENT_HEAD) {
        if (!up) {
          filters = {
            role: ROLES.DEPARTMENT_STORE_MANAGER,
            department: currentUser.department,
          };
        }
      } else if (
        currentUser.role === ROLES.SUB_BRANCH_STORE_MANAGER ||
        currentUser.role === ROLES.BRANCH_STORE_MANAGER ||
        currentUser.role === ROLES.DEPARTMENT_STORE_MANAGER
      ) {
        let role;
        if (currentUser.role === ROLES.SUB_BRANCH_STORE_MANAGER)
          role = ROLES.SUB_BRANCH_HEAD;
        if (currentUser.role === ROLES.BRANCH_STORE_MANAGER)
          role = ROLES.BRANCH_HEAD;
        if (currentUser.role === ROLES.DEPARTMENT_STORE_MANAGER)
          role = ROLES.DEPARTMENT_HEAD;
        filters = {
          role: role,
          branch: currentUser.branch,
          department: currentUser.department,
        };
      } else {
        filters = {
          role: currentUser.role,
        };
      }
      receiverId = await User.findOne(filters);
      receiverId = receiverId._id;
    }
    const notification = new Notification({
      senderId: userId,
      receiverId,
      senderName,
      message,
    });
    await notification.save();

    //Code for mail............................................................
    const notificationForMail = await Notification.find({ receiverId }).sort({
      createdAt: -1,
    });

    const userForMail = await User.findById(receiverId);
    const dynamicData = {
      username: userForMail.name,
      email: userForMail.email,
      message: notificationForMail[0].message,
    };
    console.log(dynamicData.username, dynamicData.email, dynamicData.message);

    // Build HTML content with dynamic data
    const htmlContent = `
    <html>
    <body>
      <h3 style="color: red;">Notification</h3>
      <p>Name: ${dynamicData.username},</p>
      <p>Email: ${dynamicData.email},</p>
      <p>You got following notification : ${dynamicData.message}.</p>
      <br><br><br><br>
      <footer>
          <p><b><i>**This is system generated mail.Please do not reply.</i></b></p>
      </footer>
    </body>
    </html>
    `;

    const mailOptions = {
      from: "malhargamezone@gmail.com", // Sender's email address
      to: "bhavypjala3103@gmail.com ", // Recipient's email address
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

    res.send({ success: true, message: "Notification send successfully" });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.body;
    const notifications = await Notification.find({
      receiverId: userId.toString(),
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Notifications fetched successfully",
      notifications,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
      notifications: [],
    });
  }
};

export const updateNotifications = async (req, res) => {
  try {
    const { userId } = req.body;
    let notifications = await Notification.find({
      receiverId: userId.toString(),
    });
    await Promise.all(
      notifications.map(async (notification) => {
        if (notification.isSeen === false) {
          await Notification.findByIdAndUpdate(notification._id, {
            isSeen: true,
          });
        }
      })
    );
    notifications = await Notification.find({
      receiverId: userId.toString(),
    });
    res.send({
      success: true,
      message: "Notifications updated successfully",
      notifications,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
      notifications: [],
    });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await Notification.findOneAndDelete({ _id: notificationId });
    res.send({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
