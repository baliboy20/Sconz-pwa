import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatmentComponent } from './order-statment.component';

describe('OrderStatmentComponent', () => {
  let component: OrderStatmentComponent;
  let fixture: ComponentFixture<OrderStatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
