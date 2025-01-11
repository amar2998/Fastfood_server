const Carts=require('../model/carts');



const getCartByEmail=async(req,res)=>{
    try {
        const email=req.query.email
        const query={email:email};
        const result=await Carts.find(query).exec();
        res.send(result);

        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//port on add to cart
const addToCart = async (req, res) => {
    const { menuItemId, name, recipe, image, price, quantity, email } = req.body; // consistent naming
    try {
        const existingItem = await Carts.findOne({ menuItemId,email }); // match field name

        if (existingItem) {
            return res.status(400).json({ message: "Product already exists in cart" });
        }

        const cartItem = await Carts.create({ menuItemId, name, recipe, image, price, quantity, email });
        res.status(200).json(cartItem);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCart=async (req,res)=>{
    const cartId=req.params.id;
    try {
        const deletedCart=await Carts.findByIdAndDelete(cartId);
        if(!deletedCart){
            return res.status(401).json({message:"item not found"});
        }
        else{
            return res.status(200).json({message:"cart item deleted successfully"});
        }
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}

const updateCart=async(req,res)=>{
    const cartId=req.params.id
    const {menuItemId,name,recipe,image,price,quantity,email}=req.body;
    try {
        const updateCartData=await Carts.findByIdAndUpdate(cartId,{menuItemId,name,recipe,image,price,quantity,email},{
            new:true,runValidators:true
        })
        if(!updateCartData){
            return res.status(404).json({message:"not found"})
        }
        else{
            res.status(200).json(updateCartData);
        }
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}

//get single cart
const getsingleCart=async(req,res)=>{
    const cartId=req.params.id
    try {
        const cartdata=await Carts.findById(cartId);
        if(cartdata){
            return res.status(200).json(cartdata);
        }
        else{
            res.status(404).json({message:"not found"});
        }
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
module.exports={
    getCartByEmail,
    addToCart,
    deleteCart,
    updateCart,
    getsingleCart
}