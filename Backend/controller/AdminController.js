const uploadToCloudinary = require("../config/cloudinary");
const MenuItem = require("../models/MenuItem");
const Chef = require("../models/Chef");
const UserInfo = require("../models/UserInfo");
const Waiter = require("../models/Waiter");
const Order = require("../models/Order");
const Kitchen = require("../models/Kitchen");
const Table = require("../models/Table");


exports.uploadPhoto = async (req, res) => {
  try {
    const file = req.files.image;

    //create a successful response
    const ans = await uploadToCloudinary(file);

    if (!ans) {
      return res.status(400).json({
        success: false,
        message: "Cloudinary upload failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "photo successfully uploaded",
      url: ans.secure_url,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed in Uploading photo",
    });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const { name, img, price, timing } = req.body;
    if (!name || !img || !price || !timing) {
      res.status(404).json({
        success: false,
        message: "Fill all the Details",
      });
    }

    const menuItem = await MenuItem.create({
      name,
      img,
      price,
      is_active: true,
      timing,
    });

    if (menuItem) {
      res.status(200).json({
        success: true,
        message: "MenuItem is Created Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server Error",
      error: error._message,
    });
  }
};

exports.allDetails = async (req, res) => {
  try {
    const customers = await UserInfo.countDocuments();
    const chefs = await Chef.countDocuments();
    const waiters = await Waiter.countDocuments();
    const allemployees = chefs + waiters;
    const foodItems = await MenuItem.countDocuments();
    const orders = await Order.countDocuments();
    return res.status(200).json({
      success: true,
      message: "All Data Fetched Successfully",
      customers,
      chefs,
      waiters,
      allemployees,
      foodItems,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server Error",
      error: error._message,
    });
  }
};

exports.createKitchen = async (req, res) => {
  try {
    const kitchens = await Kitchen.create({
      orders: [],
    });
    return res.status(200).json({
      success: true,
      message: "kitchen created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server Error",
      error: error._message,
    });
  }
};


exports.createTable = async (req, res) => {
    try {
        const { table_no, capacity } = req.body;

        // Check if required fields are provided
        if (!table_no || !capacity) {
            return res.status(400).json({ success: false, message: 'Table number and capacity are required.' });
        }

        // Check if table with the same number already exists
        const existingTable = await Table.findOne({ table_no });
        if (existingTable) {
            return res.status(400).json({ success: false, message: 'Table number already exists.' });
        }

        // Create a new table
        const newTable = await Table.create({
            table_no,
            capacity,
            occupied: false // Assuming initially the table is not occupied
        });

        res.status(201).json({ success: true, message: 'Table created successfully.', table: newTable });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};


exports.recentOrders = async (req, res) => {
  try {
      const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('MenuItem table_no userId');
  //  console.log(recentOrders, "recentOrders")
      const ordersWithDetails = recentOrders.map(order => ({
          itemName: order.MenuItem.name,
          amount: order.MenuItem.price,
          time: order.createdAt,
          tableNo: order.table_no.table_no,
          waiter: order.waiter // Add waiter details if needed
      }));

      res.status(200).json({ success: true, orders: ordersWithDetails });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};



exports.bestseller = async (req, res) => {
  try {
      const bestsellers = await MenuItem.find().sort({ likes: -1 }).limit(5);

      res.status(200).json({ success: true, bestsellers });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

exports.getCustomers = async (req, res) => {
  try {
      const customers = await UserInfo.find().sort({ createdAt: -1 }).limit(5).populate('user');

      const customerDetails = await Promise.all(customers.map(async customer => {
          const orders = await Order.find({ userId: customer.user._id });
          const totalAmount = orders.reduce((sum, order) => sum + order.price, 0);

          const favoriteItem = await Order.aggregate([
              { $match: { userId: customer.user._id } },
              { $group: { _id: '$menuItem', count: { $sum: 1 } } },
              { $sort: { count: -1 } },
              { $limit: 1 }
          ]);

          const favoriteMenuItem = favoriteItem.length > 0 ? await MenuItem.findById(favoriteItem[0]._id) : null;

          return {
              name: customer.user.name,
              totalAmount,
              latestOrderTime: orders.length > 0 ? orders[0].createdAt : null,
              favoriteItem: favoriteMenuItem ? favoriteMenuItem.name : 'N/A'
          };
      }));

      res.status(200).json({ success: true, customers: customerDetails });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
