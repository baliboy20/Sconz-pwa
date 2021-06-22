//   Data in the request body
//   =========================


// stripeFormatOrderDetails: {
//   payment_method_types: [ 'card' ],
//     line_items: [ [Object], [Object] ],
//     mode: 'payment',
//     success_url: 'http://localhost:4200/#/order-statement',
//     cancel_url: 'http://localhost:4200/#/order-statement'
// },
// shippingInfo: {
//   email: 'williampaulton@yahoo.co.uk',
//     firstName: 'Jamie',
//     lastName: 'Theakston',
//     address: '23 Shamrock drive',
//     apartment: 'The badlands',
//     city: 'Shannon',
//     country: 'Eire',
//     postCode: 'H3Y 2OP',
//     SaveInformation: false,
//     computedAddress: '23 Shamrock drive, The badlands, Shannon, H3Y 2OP, Eire'
// },
// basket: { cart: [ [Object], [Object] ], total: 31.11, qty: 3 }

Parse.Cloud.define("ppitd", async (request) => {
   // console.log('Request:::', request);
  if (request.params === undefined) {
    return new Error('Payload in clouc function ppitd is undefined');
  }

  const payload = request.params;

  try {
    const claz = Parse.Object.extend('CoffeeOrders');
    const inst = new claz();
    inst.set('name', 'postPaymentInitiatedToDb');
    inst.set('shippingInfo', payload.shipppingInfo);
    inst.set('cart', payload.basket);
    inst.set('payment_intent', payload.payment.payment_intent);
    inst.set('payment_status', payload.payment.payment_status);
    inst.set('payment_info', payload.payment);
    const rs = await inst.save();
    console.log('£-'.repeat(20), 'inside mainjs->postPaymentInitiatedToDb().save', rs);
    const b4a_payments_object_id = rs.id;
    return (rs);
  } catch (error) {
    console.error('ERRROR', error.message);
  }

});

// called by a configured Stripe webhook
Parse.Cloud.define('paymentComplete', async (request) => {

  try {
    console.log('``PaymentComplete --``'.repeat(7), request.body);
    const query = new Parse.Query('CoffeeOrders');
    // const query = new Parse.Query('Payments');
    const pi = request.params.pi;
    console.log('request params pi', pi)
    const result = await query.equalTo('payment_intent', pi)
      .find();
    result.forEach(async a => {
      a.set('payment_status', 'paid');
      await a.save();
    });
  } catch (error) {
    console.log('paymentComplete()', error.message);
  }
  return;
});

Parse.Cloud.define('deleteImage', async (request) => {
  const {image_id} = request.params;
  const Images = Parse.Object.extend('images');
  const query = new Parse.Query(images);
  try {
    const img = await query.get(image_id);
    const picture = img.get('picture');
    await picture.destroy({useMasterKey: true});
    await img.destroy();

  } catch (error) {
    return error;
  }
})

Parse.Cloud.define('deletStockProductImage', async (request) => {
  const {id} = request.params;
  console.log('req parms id', id);
  try {
    const query = new Parse.Query('StockProducts');
    const spItm = await query.get(id);
    const pf = spItm.get('thumbImg');
    console.log('has image', pf)
    await pf.destroy();
    spItm.set('thumbImg', null);
    spItm.save();
    return 'thumbImg successfully deleted';
  } catch (e) {
    return e.message
  }
  return 'I am a cloud on the server';
})

// 4242424242424242 w@a.co
