const express=require('express')
const router=express.Router()
const userControler=require('../control/userControler');
const verifyToken=require('../middleware/veryfyToken');
const verifyAdmin=require('../middleware/varifyAdmin');

router.get('/',verifyToken,verifyAdmin,userControler.getAllUser);
router.post('/',userControler.createUsers);
router.delete('/:id',verifyToken,verifyAdmin,userControler.deleteUsers);
router.get('/admin/:email',verifyToken,userControler.getAdmin);
router.patch('/admin/:id',verifyToken,verifyAdmin,userControler.makeAdmin);



module.exports=router;