const express = require("express");
const socketIO = require("socket.io");
const Order = require("../models/Order");
const UserInfo = require("../models/UserInfo");
const MenuItem = require("../models/MenuItem");
const Kitchen = require("../models/Kitchen");
const mongoose = require("mongoose");
const io = socketIO();


exports.allItems = async (req, res) => {
  try {
    const allitems = await MenuItem.find({ is_active: true });
    return res.status(200).json({
      success: true,
      message: "All MenuItems fetched successfully",
      items: allitems,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

exports.getMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const menu = await MenuItem.findById({ _id: id });
    res.status(200).json({
      success: true,
      message: "Successfully fetched",
      menu,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "internal server error",
      error: error._message,
    });
  }
};

exports.createUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const userInformation = await UserInfo.create({
      user: userId,
      table_no: id,
    });
    console.log("userInformation", userInformation);
    res.status(200).json({
      success: true,
      message: "UserInfo Created Successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      sucess: false,
      message: "internal server error",
      error: error._message,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const userInfo = await UserInfo.find({ user: userId });
    // if(!userInfo.payments_status)
    // {
    //   return res.status(401).json({
    //     success:false,
    //     message:'Your Payment is Not Successful'
    //   })
    // }
    const { menu_id, quantity, size, comment, table_id } = req.body;
    const order = await Order.create({
      user: userId,
      MenuItem: menu_id,
      quantity,
      size,
      comment,
      table_no: table_id,
      order_status: "Not Started",
    });

    if (order) {
      const k = await Kitchen.findOneAndUpdate(
        {},
        { $push: { orders: order._id } },
        { new: true }
      );
      const uid = new mongoose.Types.ObjectId(userId);
      const oid = new mongoose.Types.ObjectId(menu_id);
      const k1 = await UserInfo.findOneAndUpdate(
        { user: uid },
        { $push: { orders: oid } }
      );
      console.log('k1',k1);
    }
    res.status(200).json({
      success: true,
      message: "Order Created Successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      sucess: false,
      message: "internal server error",
      error: error._message,
    });
  }
};


exports.likeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { menuItemId } = req.body;

    // Check if the user has ordered the menu item
    const hasOrdered = await Order.findOne({
      userId,
      MenuItem: menuItemId
    });

    if (!hasOrdered) {
      return res.status(400).json({
        success: false,
        message: "You can only like menu items you have ordered."
      });
    }

    // Find the menu item and add the user's like
    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found."
      });
    }

    if (menuItem.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this menu item."
      });
    }

    menuItem.likes.push(userId);
    await menuItem.save();

    return res.status(200).json({
      success: true,
      message: "Menu item liked successfully.",
      menuItem
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message
    });
  }
};

// Dislike a menu item
exports.dislikeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { menuItemId } = req.body;

    // Check if the user has ordered the menu item
    const hasOrdered = await Order.findOne({
      userId,
      MenuItem: menuItemId
    });

    if (!hasOrdered) {
      return res.status(400).json({
        success: false,
        message: "You can only dislike menu items you have ordered."
      });
    }

    // Find the menu item and remove the user's like
    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found."
      });
    }

    if (!menuItem.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have not liked this menu item."
      });
    }

    menuItem.likes.pull(userId);
    await menuItem.save();

    return res.status(200).json({
      success: true,
      message: "Menu item disliked successfully.",
      menuItem
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message
    });
  }
};