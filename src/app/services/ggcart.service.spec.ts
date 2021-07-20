import { TestBed } from '@angular/core/testing';

import {GGCartService, ItemInBasketExistsHelper, SelectionsType} from './ggcart.service';

describe('GGCartService', () => {
  let service: GGCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GGCartService);
  });

  it('should Return matched', () => {

    let item: SelectionsType[] = specbasketItem as SelectionsType[];
    let basket: SelectionsType[] = [];
   // expect(ItemInBasketExistsHelper.isMatched(item, basket)).toBeTruthy();
  });
});

fdescribe('GGCartService - ItemInBasketExistsHelper', () => {
  let service = ItemInBasketExistsHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});

  });

  xit('should fail with unequal lengths', () => {

    let item: SelectionsType[] = specbasketItem;
    let basket: SelectionsType[] = specbasketItem.slice(0,1);
    expect(ItemInBasketExistsHelper.selectionsAreEqual(item, basket)).toEqual(false,'This should fail');

  });


  fit('should fail with different vIds', () => {

    let item: SelectionsType[]  = specbasketItemV1;
    let basket: SelectionsType[] = specbasketItem;
     expect(ItemInBasketExistsHelper.selectionsAreEqual(item, basket)).toEqual(false,'true');
  });

});

const specbasketItem: SelectionsType[] = [

  {
    price: 0,
    name: 'Whole beans',
    notes: 'Zmas special' ,
    vId: '721'
  },
  {
    price: 0,
    name: 'Ground For filter Maker',
    notes: 'Zmas special' ,
    vId: '9688'
  },
  {
    price: 0,
    name: 'Esspresso Blend',
    notes: 'Ground for Esspresso' ,
    vId: '3936'
  }
]


const specbasketItemV1: SelectionsType[] = [

  {
   price: 0,
   name: 'Whole beans',
  notes: 'Zmas special' ,
  vId: '721a'
  },
  {
  price: 0,
  name: 'Ground For filter Maker',
  notes: 'Zmas special' ,
  vId: '9688a'
  },
  {
  price: 0,
   name: 'Esspresso Blend',
  notes: 'Ground for Esspresso' ,
 vId: '3936a'
  }
]
