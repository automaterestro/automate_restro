// models/Order.js
const mongoose = require("mongoose");

const waiterSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  orders:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  }],
  is_active:{
    type: Boolean,
    required: true,
  },
} , {timestamps:true});

module.exports = mongoose.model("Waiter", waiterSchema);
