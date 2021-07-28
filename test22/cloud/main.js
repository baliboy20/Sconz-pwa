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
    console.log('£-'.repeat(20), 'inside mainjs->postPaymentInitiatedToDb().saveToDb', rs);
    const b4a_payments_object_id = rs.id;
    return (rs);
  } catch (error) {
    console.error('ERRROR', error.message);
  }

});

// called by a configured Stripe webhook
Parse.Cloud.define('paymentComplete', async (request) => {

  try {

    const query = new Parse.Query('CoffeeOrders');
    // const query = new Parse.Query('Payments');
    const pi = request.params.pi;
    console.log('request params pi 23:', pi)
    const result = await query.equalTo('paymentIntent', pi)
      .find();
    console.log('``Re --``'.repeat(7), 'paymentComplete(): 23 ', result);

     //console.log('``PaymentComplete --``'.repeat(7), request.body);
     //console.log('``PaymentComplete --``'.repeat(7), request.body);
    result.forEach(async a => {
      a.set('paymentStatus', 'paid');
    const resobj = await a.save();
      console.log('``Re --``'.repeat(2), 'paymentComplete(): 23', resobj);
    });
  } catch (error) {
    console.log('paymentComplete()', error.message);
  }

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

Parse.Cloud.define('deletGGStockProductImage', async (request) => {
  const {id} = request.params;
  console.log('req parms id', id);
  try {
    const query = new Parse.Query('GGStockProducts');
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


Parse.Cloud.define('UpdatelastCoffeeOrderDatetime', async (request) => {
  const {id} = request.params;
  console.log('req parms id', id);
  try {
    const retfig1 = await Parse.Config.save(
      { WhenlastCoffeeOrder: Date.now(), OrdersLastUpdate: '44'},
      {WhenlastCoffeeOrder: false, OrdersLastUpdate: false});
    return retfig1;
  } catch (e) {
    return e.message
  }
})

Parse.Cloud.define('RetrievelastCoffeeOrderDatetime', async (request) => {
  console.log('req parms id', id);
  try {
    const retfig1 = await Parse.Config.get();
    return retfig1; // .get('WhenlastCoffeeOrder');
  } catch (e) {
    return e.message
  }

})

Parse.Cloud.define('WhenlastCoffeeItemChanged', async (request) => {

  try {
    const retfig1 = await Parse.Config.save(
      { WhenlastCoffeeItemChanged: Date.now()},
      {WhenlastCoffeeItemChanged: false});
    return retfig1;
  } catch (e) {
    return e.message
  }
})

// 424242424242 4242 w@a.co
