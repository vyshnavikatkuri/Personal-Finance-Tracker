const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userid:{ type: String, required: true },
  category: { type: String, required: true }, // e.g., Food, Travel
  limit: { type: Number, required: true },     // e.g., ₹5000
  month: { type: String, required: true },     // e.g., "2025-05"
}, { timestamps: true });

const Budget = mongoose.model("budgets", budgetSchema);
module.exports = Budget;
