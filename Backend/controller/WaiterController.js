const Order = require("../models/Order");
const Waiter = require("../models/Waiter");
const Kitchen = require("../models/Kitchen");

exports.getServingOrder = async (req, res) => {
  try {
    const orders = await Kitchen.find({ status: "serving" });
    res.status(200).json({
      success: true,
      message: "Orders for serving",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "internal server error",
      error: error._message,
    });
  }
};
exports.unactiveWaiter = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await Waiter.findOneAndUpdate(
      { user: userId },
      { $set: { is_active: false } },
      { new: true, useFindAndModify: false }
    );

    if (!result) {
      console.log("Waiter not found");
      return;
    }
    return res.status(200).json({
      success: true,
      message: "Marked Unactive",
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "internal server error",
      error: error._message,
    });
  }
};
exports.activeWaiter = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await Waiter.findOneAndUpdate(
      { user: userId },
      { $set: { is_active: true } },
      { new: true, useFindAndModify: true }
    );

    if (!result) {
      console.log("Waiter not found");
      return;
    }
    return res.status(200).json({
      success: true,
      message: "Marked active",
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "internal server error",
      error: error._message,
    });
  }
};
exports.orderServed = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    if (!orderId) {
      res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }
    
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { order_status: "completed" } },
      { new: true, useFindAndModify: false }
    );

    // Find the waiter by ID and push the updated order ID into the orders array
    //iske baad humen kitchen mein jaake us order ko orders se nikal ke 
    //completed_orders mein daalna hai uski id 
    const updatedWaiter = await Waiter.findByIdAndUpdate(
      { user: userId },
      { $push: { orders: updatedOrder._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Order Served",
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      message: error,
    });
  }
};
exports.getAllWaiters = async (req, res) => {
  try {
    const waiters = await Waiter.find().populate({
      path: "user",
      select: "-password", // Exclude the password field
    });
    res.status(200).json({
      success: true,
      message: "All Waiter fetched Successfully",
      waiters,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      message: error,
    });
  }
};
exports.getActiveWaiters = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await Waiter.find({ is_active: true }).populate({
      path: "user",
      select: "-password", // Exclude the password field
    });

    if (!result) {
      console.log("Waiter not found");
      return;
    }
    return res.status(200).json({
      success: true,
      message: "Marked Unactive",
      waiter: result,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "internal server error",
      error: error._message,
    });
  }
};
