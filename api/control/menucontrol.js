const { Model } = require('mongoose');
const Menu =require('../model/menu');





const getAllMenuItems= async(req,res)=>{
    try {
        const menu=await Menu.find({}).sort({_id:-1});
        res.status(200).json(menu)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const addMenuitem=async(req,res)=>{
    const newitem=req.body;
    try {
        const result=await Menu.create(newitem);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

const deleteItem = async (req, res) => {
    const menuid=req.params.id;
    try {
        // Log the ID for debugging
      

        
        const datadel = await Menu.findByIdAndDelete(menuid);

        // If no item is found, return a 404 response
        if (!datadel) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Return a success response if deletion is successful
        res.status(200).json({ message: "Item deleted successfully" });

    } catch (error) {
        

        // Return a 500 error response with the error message
        return res.status(500).json({ message: error.message });
    }
};

const getsingleID=async(req,res)=>{
    const itemid=req.params.id;
    try {
        const data=await Menu.findById(itemid);
        if(!data){
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(data);
    } catch (error) {

         return res.status(500).json({ message: error.message });
    }
}

const updateItem=async(req,res)=>{
    const uid=req.params.id;
    const newval=req.body;
    try {
        const result=await Menu.findByIdAndUpdate(uid,newval,{new:true,runValidators:true});
        if(!result){
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

module.exports ={
    getAllMenuItems,
    addMenuitem,
    deleteItem,
    getsingleID,
    updateItem
};

