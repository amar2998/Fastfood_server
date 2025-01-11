
const mongoose=require('mongoose')

const CartSchema=new  mongoose.Schema({
    menuItemId:String,
    name:{
        type:String,
        trim:true,
        require:true,
        minlength:3
    },
    recipe:String,
    image:String,
    price:Number,
    quantity:Number,
    email:{
        type:String,
        trim:true,
        require:true


    }

})
const Carts=mongoose.model("Cart",CartSchema);
module.exports= Carts;