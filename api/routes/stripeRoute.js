const express = require("express");
require("dotenv").config();
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  try {
    // Create a PaymentMethod from the token
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        token: req.body.tokenId,
      },
    });

    // Create a PaymentIntent using the PaymentMethod
    const stripeRes = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: req.body.amount,
      currency: "inr",
    });

    res.status(200).json(stripeRes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
