const transectionModel = require("../models/transectionModel");
const moment = require("moment");
const Budget = require("../models/budgetModel");
const Notification = require("../models/notificationModel");


const getAllTransection = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transections = await transectionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transections);
  } catch (error) {
    console.log(error);
    res.status(500).json(erorr);
  }
};

const deleteTransection = async (req, res) => {
  try {
    await transectionModel.findOneAndDelete({ _id: req.body.transacationId });
    res.status(200).send("Transaction Deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const editTransection = async (req, res) => {
  try {
    await transectionModel.findOneAndUpdate(
      { _id: req.body.transacationId },
      req.body.payload
    );
    res.status(200).send("Edit SUccessfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// const addTransection = async (req, res) => {
//   const { userId, amount, category, date } = req.body;
//   try {
//     const month = moment(date).format("YYYY-MM"); // e.g., 2025-05

//     // Get all transactions of this category in this month
//     const totalSpent = await Transection.aggregate([
//       { $match: {  userid:userId, category, date: { $gte: new Date(`${month}-01`), $lte: new Date(`${month}-31`) } } },
//       { $group: { _id: null, total: { $sum: "$amount" } } }
//     ]);

//     const spent = totalSpent[0]?.total || 0;

//     const budget = await Budget.findOne({ userId, category, month });
//     if (budget && (spent + amount) > budget.limit) {
//       const msg = `🚨 Budget limit exceeded for ${category} in ${month}`;

//       // Save notification
//       await Notification.create({ userId, message: msg });
//     }
//     const newTransection = new transectionModel({
//       userid: userId,
//       amount,
//       type,
//       category,
//       refrence,
//       description,
//       date,
//     });
//     await newTransection.save();
//     // res.status(201).send("Transection Created");
//     res.status(201).send({
//     message: budget && (spent + amount) > budget.limit ? msg : null,
//     status: "Transection Created"
// });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };


const addTransection = async (req, res) => {
  const { userid, amount, category, date, type, refrence, description } = req.body;
  try {
    const month = moment(date).format("YYYY-MM");
    const normalizedCategory = category.toLowerCase();

    const totalSpent = await transectionModel.aggregate([
      {
        $match: {
          userid,
          category,
          date: {
            $gte: moment(month, "YYYY-MM").startOf("month").toDate(),
            $lte: moment(month, "YYYY-MM").endOf("month").toDate(),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const spent = totalSpent[0]?.total || 0;
    console.log("🔎 Debug Info:");
console.log("User ID:", userid);
console.log("Category:", category);
console.log("Month:", month);
console.log("Spent:", spent);
console.log("Amount to Add:", amount);

    const budget = await Budget.findOne({ userid, category: normalizedCategory,month})
    console.log("Budget found:", budget);


    let msg = null;
    if (budget && spent + amount > budget.limit) {
       console.log("✅ Budget exceeded, adding notification");
      msg = `🚨 Budget limit exceeded for ${category} in ${month}`;
      await Notification.create({ userid, message: msg });
      console.log("✅ Notification saved!");

      // await Notification.create({ userid, message: msg });
      
    }
    const newTransection = new transectionModel({
      userid,
      amount,
      type,
      category: normalizedCategory,
      refrence,
      description,
      date,
    });

    await newTransection.save();

    res.status(201).send({
      message: msg,
      status: "Transection Created",
    });
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ error: error.message || "Server Error" });
    console.error("❌ Error in addTransection:", error);
  res.status(500).json({ error: error.message || "Server Error" });
  }
};

module.exports = {
  getAllTransection,
  addTransection,
  editTransection,
  deleteTransection,
};
