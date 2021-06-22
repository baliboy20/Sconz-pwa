// import {beginPaymentSession} from "./routes";
// import {createPaymentIntent} from "./routes";
var express = require('express');

const stripe = require('stripe')('sk_test_AH9g7LumOkwHtNRQ0kEfwLh400coO8wEE9');
const routes = require('./routes');
const cors = require('cors');
const axios = require('axios');
const Parse = require('parse/node.js');

const bodyparser = require('body-parser')
const environment = {
  production: false,
  PARSE_APP_ID: 'fZTnKcHmI10Bqv2avtNiRQzaxFotKVFMLTF9tR7i',
  PARSE_JS_KEY: 'TbOsxLryXvD6sP7GvOQ1t2HhNqMegtFaJJAPbPGt',
  PARSE_REST_API_KEY: '5BfNScDDuwnfgFXJCWJvMNFTtGHQq1C3fhNdH2XT',
  MASTER_KEY: '7UkSTU17KQhM5NpJy7hpxdJOfpwE3FtgoHQb8PQ7',
  // serverURL: 'https://parseapi.back4app.com'
  serverURL: 'https://test22.b4a.io'
};
var app = express();
Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
Parse.serverUrl = environment.serverURL;
var counter = 0;

// const {testfn} = require("./routes");
app.use(cors())

/** ====================================
 *
 * @returns {Promise<AxiosResponse<any>>}
 *
 ==================================== */
app.get('/handshake', (rq, rs) => {
 // const result = postDb();
  console.log('handshaken..');
  rs.send({'message': 'Champion', 'payload': 'result'});
  // gravy2();


})


/** ====================================
 *
 * Create checkout session. used as main payments method
 *
 * checkout session {
  id: 'cs_test_a1QqhJQaoLS4lKEsmMV6jaE65MKXmdlxhlftupjq3H24Gq8k4pDZw4VICw',
  object: 'checkout.session',
  allow_promotion_codes: null,
  amount_subtotal: 6000,
  amount_total: 6000,
  billing_address_collection: null,
  cancel_url: 'http://localhost:4200/checkout/payment-success',
  client_reference_id: null,
  currency: 'gbp',
  customer: null,
  customer_details: null,
  customer_email: null,
  livemode: false,
  locale: null,
  metadata: {},
  mode: 'payment',
  payment_intent: 'pi_1IUTKYFSRZP1GrxVbg2y2ffa',
  payment_method_types: [ 'card' ],
  payment_status: 'unpaid',
  setup_intent: null,
  shipping: null,
  shipping_address_collection: null,
  submit_type: null,
  subscription: null,
  success_url: 'http://localhost:4200/checkout/payment-success',
  total_details: { amount_discount: 0, amount_tax: 0 }
}
 ==================================== */

/**
 *
 * This has now been deprecated.
 * @param details
 * @returns {Promise<AxiosResponse<any>>}
 */
// async function postDb(details) {
//   try {
//
//     const headers = {
//       'X-Parse-Application-Id': 'fZTnKcHmI10Bqv2avtNiRQzaxFotKVFMLTF9tR7i',
//       'X-Parse-REST-API-Key': '5BfNScDDuwnfgFXJCWJvMNFTtGHQq1C3fhNdH2XT',
//       'Content-Type': 'application/json'
//     };
//     //todo is this callable any longer?
//     const url = 'https://parseapi.back4app.com/functions/updatePlayer?attributes=will&yearOfBirth=230863';
//     const result = await axios.post(url, details, {headers: headers});
//     console.log('* Payment recorded *'.repeat(6), '\n');
//     // console.log('* Payment recorded *'.repeat(6), '\n', result.data);
//     return result;
//   } catch
//     (error) {
//     console.log('* qry() Error *'.repeat(6), '\n', error);
//     return;
//   }
// }

/**
 *            CREATE CHECKOUT SESSION
 */

app.post('/create-checkout-session', bodyparser.json(), async (req, res) => {
  counter = 1;
  console.debug('====='.repeat(10),'/create-checkout-session', req.body);
  // console.log('~_&'.repeat(60), '.\n'.repeat(15));
  // console.log('$_-$_-'.repeat(20), '\n REQUEST BODY', JSON.stringify(req.body));
  let session;
  try {
    session = await stripe.checkout.sessions.create(req.body);
  } catch (error) {
    console.log('An Error in app.js -> /create-checkout-session', error.message);
    res.status(500).send(new Error(error.message));
    return;
  }

  const amount_total = session.amount_total;
  const mode = session.mode;
  const payment_intent = session.payment_intent;
  const currency = session.currency;
  const payment_status = session.payment_status;

  //TODO do we really need this now
  await postDb({amount_total, mode, payment_intent, currency, payment_status})
  // await confirmPaymentDb({pi: '123erty'})
  res.json(session);
  return;
});

/**
 *            WEB HOOK
 */

// Match the raw body to content type application/json
app.post('/webhook', bodyparser.raw({type: 'application/json'}), async (request, response) => {


  const event = request.body;
  const val = request.body.toString('utf8');
  const oval = JSON.parse(val);
  //  console.log('==='.repeat(20), '\n webhook fired \n', event.type);
  // confirmPaymentDb(oval.data.object.payment_intent)
  // Handle the event
  switch (oval.type) {

    case 'checkout.session.completed':
    //  console.log(counter, '-- counter->?/.'.repeat(10), `\n\nEvent type ${oval.type}`, oval.data.object.payment_intent);
     await confirmPaymentDb({pi: oval.data.object.payment_intent})

      counter++;
      response.json({received: true});
      return;

    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
    // console.log('@@@@'.repeat(20), `\n\nDefault event type ${event.type}`, request.body.toString('utf8'));
  }

  // Return a response to acknowledge receipt of the event

  return null;
});

/**
 *  Used in Development to create static pages for items products when running scully.
 */
app.get('/scully', async (req, res) => {

  try {
    const headers = {
      'X-Parse-Application-Id': environment.PARSE_APP_ID,
      'X-Parse-REST-API-Key': environment.PARSE_REST_API_KEY,
    };
    const url = 'https://parseapi.back4app.com/classes/StockProducts';
    const result = await axios.get(url, {headers: headers});
    console.debug(result.data.results);
    // console.log('* Payment recorded *'.repeat(6), JSON.stringify(result));
    res.json(result.data.results);
    ;
  } catch
    (error) {
    console.log('* qry() Error *', '\n', error);
    res.send(`ERRor: ${error.message}`);
  }

})


async function confirmPaymentDb(arg_) {
  try {
    const arg = arg_.pi;
    console.log('00000'.repeat(5), 'inside confrimPaymentsDb()', arg);
    const headers = {
      'X-Parse-Application-Id': 'fZTnKcHmI10Bqv2avtNiRQzaxFotKVFMLTF9tR7i',
      'X-Parse-REST-API-Key': '5BfNScDDuwnfgFXJCWJvMNFTtGHQq1C3fhNdH2XT',
      'Content-Type': 'application/json'
    };
    const url = 'https://parseapi.back4app.com/functions/paymentComplete?attributes=will&yearOfBirth=230863';
    const result = await axios.post(url, {pi: arg}, {headers: headers});
    // const  b4a_payments_object_id = result.body.b4a_payments_object_id;
    console.log('* Payment recorded *'.repeat(6), '\n', arg);
  } catch (error) {
    console.log('* qry() Error *'.repeat(6), '\n', error.message);
  }
}

module.exports = app;