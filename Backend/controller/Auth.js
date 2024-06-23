const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Waiter = require("../models/Waiter");
const AdditionalDetail = require("../models/AdditionalDetails");

exports.signup = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { name, email, password, mobile_no, accountType } = req.body;
    // Check if All Details are there or not
    if (!name || !email || !password || !mobile_no || !accountType) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const additionalDetails = await AdditionalDetail.create({
      img: "",
      about: "",
      age: "",
      gender: "",
    });
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      accountType: accountType,
      $push: { AdditionDetails: additionalDetails._id },
    });
    if (accountType === "Waiter") {
      await Waiter.create({ user: user._id, is_active: true });
    }
    const token = jwt.sign(
      { email: user.email, id: user._id, AccountType: user.accountType },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    user.token = token;
    user.password = undefined;
    // Set cookie for token and return success response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: `User Registered Successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

// Login controller for authenticating users
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }
    console.log('email',email);
    const user = await User.findOne({ email:email });
    console.log('user',user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }
    
    
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, AccountType: user.AccountType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.log('error',error);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};
