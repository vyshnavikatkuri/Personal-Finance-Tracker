const express = require("express");
const router = express.Router();
const Budget = require("../models/budgetModel");



// Add or Update Budget
router.post("/set", async (req, res) => {
  const { userid,category, limit, month } = req.body;
  try {
    const existing = await Budget.findOne({ userid,category,month});
    if (existing) {
      existing.limit = limit;
      await existing.save();
      return res.send("Budget updated");
    }

    const budget = new Budget({ userid, category, limit, month });
    await budget.save();
    res.send("Budget set successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all budgets for a user
router.get("/:userid",async (req, res) => {
  const { userid } = req.params;
  try {
    const budgets = await Budget.find({ userid});
    res.json(budgets);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
