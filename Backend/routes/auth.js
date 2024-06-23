const express = require('express');
const router = express.Router();
const {login,signup}=require('../controller/Auth')
const {validateData} =require('../utils/validations/validateData');
const {userSchema}=require('../utils/validations/Schema/AuthSchema')
//user get the items.

router.post('/login',login);
router.post('/signup',validateData(userSchema),signup);

module.exports=router;