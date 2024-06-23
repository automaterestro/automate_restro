const express = require('express');
const router = express.Router();
const {auth,isManager}=require('../middleware/authorization');
const {createMenuItem,allDetails,createTable,createKitchen, bestseller, getCustomers, recentOrders}=require('../controller/AdminController');
router.post('/createItem',auth,isManager,createMenuItem);
router.get('/all-details',auth,isManager,allDetails);
router.get('/create-kitchen',auth,isManager,createKitchen);
router.post('/create-table',auth,isManager,createTable);
router.get('/recent', auth, isManager, recentOrders);

// Menu routes
router.get('/bestseller', auth, isManager, bestseller);

// Customer routes
router.get('/customers', auth, isManager, getCustomers);
module.exports=router;