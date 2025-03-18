const mongoose=require('mongoose')
const connectDB=async()=>{
    try{
        const connect=await mongoose.connect("mongodb://localhost:27017",{
        })
        
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    }
    catch(err){
        console.log(err)
    }
}

module.exports=connectDB