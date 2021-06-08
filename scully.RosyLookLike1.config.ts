import {ScullyConfig} from '@scullyio/scully';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'RosyLookLike1',
  outDir: './dist/static',
  routes: {
    '/product-item2/:id': {
      type: 'json',
      id: {
        url: 'https://test22.b4a.app/scully',
        property: 'objectId',
        headers: {
          'X-Parse-Application-Id': 'fZTnKcHmI10Bqv2avtNiRQzaxFotKVFMLTF9tR7i',
          'X-Parse-REST-API-Key': '5BfNScDDuwnfgFXJCWJvMNFTtGHQq1C3fhNdH2XT'
        }
      }
    }
  }
};

