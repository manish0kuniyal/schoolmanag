const express=require('express')
const router=express.Router()
const {Register,LoginUser}=require('../controller/authcontroller')
const verifyToken=require('../middleware/authmiddleware')

router.post('/register',Register)
router.post('/login',LoginUser)
router.get('/',verifyToken,(req,res)=>{
    res.json({route:"protectedroute"})
})
module.exports =router