const mongoose = require('mongoose');

const paymentScheme = new mongoose.Schema({
    transaction_id: String,
    email: String,
    price: Number,
    quantity: Number,
    status: String,
    itemName:Array,
    cardItem:Array,
    menuItem: Array,
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const Payment = mongoose.model("payment", paymentScheme);

module.exports = Payment;