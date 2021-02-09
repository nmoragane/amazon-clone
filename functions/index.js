const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51IHCQbBMf5KAvc4xq7GAB7HptI89gMOJ0x99WoOQzTX1GmojWybIbrsLHJsYIdazW1GhnEW6Y4m2p9T9a7ybfmIX00wFHTE0gC');

// API

// /app config
const app = express();

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// api routes
app.get('/', (req,res) => res.status(200).send('hellow'));

app.post('/payments/create', async (req,res) => {
    const total = req.query.total;

    console.log('payment req recieved >>> ', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits usd => cents
        currency: "usd",
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
} )

// listen command
exports.api = functions.https.onRequest(app);

// exmple endpoint
// http://localhost:5001/clone-838ef/us-central1/api