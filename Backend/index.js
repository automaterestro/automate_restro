// Importing necessary modules and packages
const express = require("express");
const app = express();
const database = require("./config/database");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");
const socketIO = require("socket.io");
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cookieparser());
const io = socketIO();
dotenv.config();
const PORT = process.env.PORT || 4000;
database.connect();

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

app.listen(PORT, () => {
  console.log(`PORT is running on ${PORT}`);
});


//creating routes 
const authRoutes=require('./routes/auth');
const managerRoutes=require('./routes/ManagerRoutes');
const extraRoutes=require('./routes/extra');
const userRoutes=require('./routes/CustomerRouter');
const kitchenRoutes=require('./routes/KitchenRoute')
const waiterRoutes=require('./routes/WaiterRoute')
app.use('/manager',managerRoutes);
app.use('/auth',authRoutes);
app.use('/util',extraRoutes);
app.use('/user',userRoutes);
app.use('/kitchen',kitchenRoutes);
app.use('/waiter',waiterRoutes);
