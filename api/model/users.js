const mongoose=require('mongoose');


const userscheme= new mongoose.Schema({
    name:String,
    email:{
        type:String,
        trim:true,
        minlength:3
    },
    photoURL:String,
    role:{
        type:String,
        enum:[
            'user','admin'
        ],
        default:'user'
    }

})
const users=mongoose.model('user',userscheme);
module.exports= users;
