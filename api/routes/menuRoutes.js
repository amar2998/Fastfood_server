const express=require('express');
const Menu = require('../model/menu');
const router=express.Router();

const menuController=require('../control/menucontrol')
router.get('/',menuController.getAllMenuItems);
router.post('/',menuController.addMenuitem);
router.delete('/:id',menuController.deleteItem);
router.get('/:id',menuController.getsingleID);
router.put('/:id',menuController.updateItem);

module.exports = router;