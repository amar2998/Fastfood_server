const express = require('express')
const app = express();
const port = process.env.port || 6001
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const jwt = require('jsonwebtoken')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


app.use(cors());
app.use(express.json())
// name: amarsonufastFood
// pass: amarsonufastFood
// mongodb configuration 
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@fastfood.v4szb.mongodb.net/fastFood?retryWrites=true&w=majority&appName=fastFood`)
    .then(() => {
        console.log("mongodb connected success")
    }).catch((error) => {
        console.log(error);
    });



//these all are middlewear
const menuRoutes = require('./api/routes/menuRoutes');
app.use('/menu', menuRoutes);
const cartRoutes = require('./api/routes/cartRoutes');
app.use('/carts', cartRoutes);
const userRoutes = require('./api/routes/userRoutes');
app.use('/user', userRoutes);
const paymentRoutes=require('./api/routes/paymentRoutes');
app.use('/payment',paymentRoutes);



//jwtauth
app.post('/jwt', async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1hr'
    })
    res.send({ token });
})
// const verifyToken=(req,res,next)=>{
//     // console.log(req.headers.authorization)
//     if(!req.headers.authorization){
//         return res.status(401).send({message:"unauthorized access"});
//     }
//     const token=req.headers.authorization.split(' ')[1];
//     // console.log(token);
//     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
//         if(err){
//             return res.status(401).send({message:"invalid token"});
//         }
//         req.decoded=decoded;
//         next();

//     })

// }

// stripe payment routes
app.post('/create-payment-intent', async (req, res) => {
    const { price } = req.body;
    const amount = price * 100;


    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: [
            "card"],


    });

    res.send({
        clientSecret: paymentIntent.client_secret,
        // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
        dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
});





app.get('/', (req, res) => {
    res.send("hii")
})


app.listen(port, () => {
    console.log(`server is running on port${port}`);
})