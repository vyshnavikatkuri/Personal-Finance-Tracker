const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("notifications", notificationSchema);
module.exports = Notification;
