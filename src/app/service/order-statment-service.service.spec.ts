import { TestBed } from '@angular/core/testing';

import { OrderStatmentService } from './order-statment.service';

fdescribe('OrderStatmentServiceService', () => {
  let service: OrderStatmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderStatmentService);
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
