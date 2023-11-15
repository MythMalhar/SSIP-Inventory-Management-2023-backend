import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    default: '',
  },
  isSeen: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Notification = mongoose.model('notifications', notificationSchema);
export default Notification;
