// models/Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  MenuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    enum: ["Small", "Medium", "Large"],
    required: true,
  },
  comment: {
    type: String,
  },
  table_no: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
  },
  order_status: {
    type: String,
    enum: ["completed", "Serving", "In Progress", "Not Started"],
  },
} , {timestamps:true});

module.exports = mongoose.model("Order", OrderSchema);
