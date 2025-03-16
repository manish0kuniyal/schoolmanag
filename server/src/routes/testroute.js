const express=require('express')
const router=express.Router()
const{ Testcontroller}=require("../controller/testcontroller")
router.get('/',Testcontroller)
module.exports=router