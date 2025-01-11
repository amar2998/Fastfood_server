const express = require("express");
const Cart = require('../model/carts'); // Uncomment and use the correct path to the Cart model
const router = express.Router();
const cartControl = require('../control/cartControler');
const verifyToken=require('../middleware/veryfyToken');

// Assuming you have the addToCart and getCartByEmail functions in your cartControler file
router.get('/', verifyToken,cartControl.getCartByEmail);
router.post('/', cartControl.addToCart);
router.delete('/:id',cartControl.deleteCart);
router.put('/:id',cartControl.updateCart);
router.get('/:id',cartControl.getsingleCart);
module.exports = router;