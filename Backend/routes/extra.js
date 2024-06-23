const express = require('express');
const router = express.Router();

const {auth,isManager}=require('../middleware/authorization')
const {uploadPhoto}=require('../controller/AdminController');
//user get the items
router.post('/uploadPhoto',auth,isManager,uploadPhoto);
module.exports=router;