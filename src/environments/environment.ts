// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  LOCAL_STORAGE_CART_ITEMS_KEY: 'CART_ITEMS',
  LOCAL_STORAGE_CLICK_COLLECT_ITEMS_KEY: 'CLICK_COLLECT_CART_ITEMS',
  LOCAL_STORAGE_CART_ITEMS_KEY_DEV: 'CART_ITEMS_DEV',
  production: false,
  informationPagesPath: 'http://localhost:4200/assets/information-pages',
  siteUrl: 'http://localhost:4200',
  PARSE_APP_ID: 'fZTnKcHmI10Bqv2avtNiRQzaxFotKVFMLTF9tR7i',
  PARSE_JS_KEY: 'TbOsxLryXvD6sP7GvOQ1t2HhNqMegtFaJJAPbPGt',
  PARSE_REST_API_KEY: '5BfNScDDuwnfgFXJCWJvMNFTtGHQq1C3fhNdH2XT',
  PARSE_MASTER_KEY: '7UkSTU17KQhM5NpJy7hpxdJOfpwE3FtgoHQb8PQ7',
  ParseServerURL: 'https://parseapi.back4app.com/',
  DEV_ParseServerURL: 'http://localhost:3000',
  stripe_pkey: 'pk_test_gESpLAexm8oTAFcLjCNEQkOw00smIXKrfx',
  Stripe_Order_Complete: {
    success_route: '/#/orders-statement',
    cancel_route: '/#/orders-statement',
  },
  build_version: '14.0a prod 09 Oct\'21',
  useDevCart: true,
  // dev flags
  enableNavToStripPayment: false,
  noImageUrl:  `https://parsefiles.back4app.com/fZTnKcHmI10Bqv2avtNiRQzaxFotKVFMLTF9tR7i/22d775cdda6dbe865ba814d7900561ee_no_image-sm.jpg`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
