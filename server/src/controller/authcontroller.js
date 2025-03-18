const User=require('../models/usermodel')
const bcrypt=require('bcryptjs')
const createToken=require("../utils/generateToken")


const Register=async(req,res)=>{
    const {username,email,password,role}=req.body
    if(!username||!email||! password||!role){
        return res.status(500).json({msg:"please enter all the fields"})
    }
    try{
        const existingUser=await User.findOne({email})
        if(existingUser)
            return res.status(400).json({msg:"User with email already exists"})
        
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=await User.create({username,email,password:hashedPassword,role})
         return res.status(201).json({ msg: "User registered successfully", user: newUser });
    }
    catch(err){
        res.status(500).json({error:"error while regitering ..",err})
    }
}

const LoginUser=async(req,res)=>{
    const {email,password}=req.body
    if(!email||! password){
        return res.status(500).json({msg:"please enter all the fields"})
    }
    try{
        const user =await User.findOne({email})
        if(!user)
            return res.status(401).json({msg:"user not found"})

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch)
            return res.status(401).json({msg:"Invalid password"})

        const token=createToken(user.email,user.role)
        console.log(token)
        
        return res.status(200).json({msg:"login successfully",user ,token})
    }
    catch(err){
        res.status(500).json({err})
    }
}
module.exports={Register,LoginUser}