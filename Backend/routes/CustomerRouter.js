const express = require('express');
const router = express.Router();
const{auth,isUser}=require('../middleware/authorization');
const {allItems, getMenuItem, createUserInfo ,createOrder, likeOrder, dislikeOrder} = require('../controller/CustomerController');

router.get('/all-items',auth,isUser,allItems);
router.get('/menuitem/:id',auth,isUser,getMenuItem);
router.post('/create-user/:id',auth,isUser,createUserInfo)
router.post('/create-order',auth,isUser,createOrder)

router.post('/like', auth, isUser, likeOrder);
router.post('/dislike', auth, isUser, dislikeOrder);
module.exports=router;