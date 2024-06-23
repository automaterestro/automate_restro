// controllers/kitchenController.js
const Order = require('../models/Order');
const Chef = require('../models/Chef');
const Kitchen = require('../models/Kitchen');
const mongoose = require('mongoose');
const socketIO = require('socket.io');

const io = socketIO();

exports.getOrders = async (req, res) => {
  try {
    // Fetch kitchen with orders populated
    const kitchen = await Kitchen.findOne().populate('orders');
    if (!kitchen) {
      return res.status(404).json({
        success: false,
        message: 'Kitchen not found',
      });
    }

    // Filter orders with status "Not Started" or "In Progress"
    const pendingOrInProgressOrders = kitchen.orders.filter(
      (order) =>
        order.order_status === 'Not Started' ||
        order.order_status === 'In Progress'
    );

    res.status(200).json({
      success: true,
      orders: pendingOrInProgressOrders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPrepared = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { order_status: 'ready' },
      { new: true }
    );
    io.emit('order-ready', order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createChef = async (req, res) => {
  try {
    const userId = req.user.id;
    const { experience, cuisine } = req.body;
    if (!experience || !cuisine) {
      return res.status(404).json({
        success: false,
        message: 'Fill all the details',
      });
    }
    const chef = await Chef.create({
      chef: userId,
      experience,
      cuisine,
      is_Active: true,
    });
    if (chef) {
      await Kitchen.findOneAndUpdate(
        {},
        { $push: { chefs: chef._id } },
        { new: true }
      );
    }
    res.status(200).json({
      success: true,
      message: 'Chef Created Successfully',
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

exports.allCompletedOrder = async (req, res) => {
  try {
    // Fetch completed orders from the Kitchen model
    const kitchen = await Kitchen.findOne().populate('ordersCompleted');
    if (!kitchen) {
      return res.status(404).json({
        success: false,
        message: 'Kitchen not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Completed Orders',
      orders: kitchen.ordersCompleted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

exports.completeParticularOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (
      !order ||
      (order.order_status !== 'In Progress' &&
        order.order_status !== 'Not Started')
    ) {
      return res.status(401).json({
        success: false,
        message: 'Order not found or not in a valid state for completion',
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { order_status: 'Serving' },
      { new: true }
    );

    await Kitchen.findOneAndUpdate(
      {},
      { $pull: { orders: orderId }, $push: { ordersCompleted: orderId } },
      { new: true }
    );

    await Chef.findOneAndUpdate(
      { chef: userId },
      { $push: { orders: order._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Order Served',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetKitchenOrder = async (req, res) => {
  try {
    const kitchen = await Kitchen.findOne();
    if (!kitchen) {
      return res.status(404).json({
        success: false,
        message: 'Kitchen not found',
      });
    }

    kitchen.orders = [];
    kitchen.ordersCompleted = [];
    await kitchen.save();

    res.status(200).json({
      success: true,
      message: 'Kitchen reset Successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
