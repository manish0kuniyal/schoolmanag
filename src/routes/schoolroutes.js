const express=require('express')
const {AddSchool,ListSchools}=require("../controller/schoolcontroller")

const router=express.Router()

router.post('/addSchool',AddSchool)
router.get('/listSchools',ListSchools)

module.exports=router