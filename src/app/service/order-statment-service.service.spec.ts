import { TestBed } from '@angular/core/testing';

import { ActiveOrderService } from './active-order.service';

fdescribe('OrderStatmentServiceService', () => {
  let service: ActiveOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have the time expire properly', () => {
    service.order = 'a new order';
    console.log('order', service.getOrder());
    expect(service.getOrder()).toEqual('a new order');
  })
});
