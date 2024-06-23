const express = require('express');
const router = express.Router();
const{auth,isDelivery}=require('../middleware/authorization');
const {unactiveWaiter,getAllWaiters,getActiveWaiters,activeWaiter,getServingOrder,orderServed} = require('../controller/WaiterController');
//user get the items.
router.get('/serving-order',auth,isDelivery,getServingOrder);
router.patch('/make-inactive',auth,isDelivery,unactiveWaiter);
router.patch('/make-active',auth,isDelivery,activeWaiter);
router.put('/complete/:id',auth,isDelivery,orderServed);
router.get('/allwaiters',auth,isDelivery,getAllWaiters)
router.get('/activewaiters',auth,isDelivery,getActiveWaiters);
module.exports=router;