"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stripe = require('stripe')('sk_test_AH9g7LumOkwHtNRQ0kEfwLh400coO8wEE9');
module.exports.testfn = (req, res) => {
  res.send({message:'testfn.'})
}

const _calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

async function createPaymentIntent(req, res) {
  console.log('body', req.body);
  // res.send({msg: 'okkkk', 'data': req.body.data});
  // return;
  const { items } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: _calculateOrderAmount(items),
    currency: 'gbp',
    payment_method_types: ['card'],
  });
  console.log('payment intent', paymentIntent);
  res.send({
    clientSecret: paymentIntent.client_secret
  });
}
module.exports.createPaymentIntent = createPaymentIntent;
