const express = require("express");
const router = express.Router();
const Notification = require("../models/notificationModel");

// GET all notifications for a user
router.get("/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const notes = await Notification.find({ userid }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;
