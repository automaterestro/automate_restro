const express = require('express');
const router = express.Router();
const {auth,isKitchen,isAdmin}=require('../middleware/authorization')
const { getOrders, getPrepared,createChef ,allCompletedOrder,resetKitchenOrder } = require('../controller/KitchenController');
//user get the items.

router.get('/orders',auth,isKitchen,getOrders);
router.put('/preparedOrder',getPrepared);
router.post('/create-chef',auth,isKitchen,createChef)
router.post('/completed-orders',auth,isKitchen,allCompletedOrder);
router.put('/resetKitchen',auth,isKitchen,resetKitchenOrder)
module.exports=router;