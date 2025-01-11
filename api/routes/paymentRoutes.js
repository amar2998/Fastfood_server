const express =require('express');
const Payment =require('../model/payment');
const router=express.Router();
const verifyToken=require('../middleware/veryfyToken');
const Cart=require('../model/carts');
const mongoose  = require('mongoose');
const ObjectId=mongoose.Types.ObjectId;



router.post('/',verifyToken,async(req,res)=>{
    const data=req.body;
    try {
        const result=await Payment.create(data);
        // delete cart after payment
        const cartIDs=data.cardItem.map(id => new ObjectId(id));
        const deletedCartrequest=await Cart.deleteMany({_id:{$in:cartIDs}});

        res.status(200).json({result,deletedCartrequest});
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
})
router.get('/',verifyToken,async(req,res)=>{
    const email=req.query.email;
    const query={email:email};

    try {
        const decodedemail=req.decoded.email;
        if(email!==decodedemail){
          return res.status(403).json({message:"forbidden access"});
        }
        const result=await Payment.find(query).sort({createdAt:-1}).exec();
        res.status(200).json(result);

    } catch (error) { 
        res.status(500).json({message:error.message});
    }
})
router.delete('/:id',verifyToken,async(req,res)=>{
    const id=req.params.id;
    try {
        const result=await Payment.findByIdAndDelete(id);
        if(result){
            return res.status(200).json({message:"Successfully deleted"});
        }else {
            return res.status(404).json({ message: "Payment not found" });
        }
       

    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
})
router.put('/',verifyToken,async(req,res)=>{
    const obj=req.body;
    const objid=obj._id;
    try {
        const result=await Payment.findByIdAndUpdate(objid,obj,{new:true});
        if(result){
            res.status(200).json(result);
        }else {
            return res.status(404).json({ message: "Payment not found" });
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

module.exports=router;