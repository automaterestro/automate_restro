const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
dotenv.config();
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies["token"] ||
      req.header("Authorization").replace("Bearer", "");
    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` });
    }

    try {	
	  
      const decode =await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
	  
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
    });
  }
};
exports.isManager = async (req, res, next) => {
  try {
	console.log('req',req.user.email);
    const userDetails = await User.findOne({ email: req.user.email });
	console.log('userDetails',userDetails);
    if (userDetails.accountType !== "Manager") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Manager",
      });
    }
    next();
  } catch (error) {
	  console.log('error',error);
    return res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` });
  }
};
exports.isDelivery = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== "Waiter") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Delivery person",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` });
  }
};
exports.isUser = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== "User") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for User",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` });
  }
};
exports.isKitchen = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });
    console.log("user", userDetails);
    if (userDetails.accountType !== "Kitchen") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Kitchen",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` });
  }
};
