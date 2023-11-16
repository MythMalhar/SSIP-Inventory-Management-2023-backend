import ROLES from '../constants/ROLES.js';
import Notification from '../models/notificationModel.js';
import User from '../models/userModel.js';

export const createNotification = async (req, res) => {
  try {
    let { userId, receiverId, message } = req.body;
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
        filters = {
          role: ROLES.SUB_BRANCH_STORE_MANAGER,
          subBranch: currentUser.subBranch,
          branch: currentUser.branch,
          department: currentUser.department,
        };
      } else if (currentUser.role === ROLES.SUB_BRANCH_STORE_MANAGER) {
        filters = {
          role: ROLES.BRANCH_STORE_MANAGER,
          branch: currentUser.branch,
          department: currentUser.department,
        };
      } else if (currentUser.role === ROLES.BRANCH_HEAD) {
        filters = {
          role: ROLES.BRANCH_STORE_MANAGER,
          branch: currentUser.branch,
          department: currentUser.department,
        };
      } else if (currentUser.role === ROLES.BRANCH_STORE_MANAGER) {
        filters = {
          role: ROLES.DEPARTMENT_STORE_MANAGER,
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
    res.send({ success: true, message: 'Notification send successfully' });
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
    });
    res.send({
      success: true,
      message: 'Notifications fetched successfully',
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
      message: 'Notifications updated successfully',
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
      message: 'Notification deleted successfully',
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
