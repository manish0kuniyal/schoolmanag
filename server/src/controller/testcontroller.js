const Testcontroller=async(req,res)=>{
    try{
        res.json({ok:"0ok"})
    }
    catch(err){
            res.status(400).json({err})
    }
}

module.exports={Testcontroller}