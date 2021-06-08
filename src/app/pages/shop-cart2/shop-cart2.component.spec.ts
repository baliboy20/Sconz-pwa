import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCart2Component } from './shop-cart2.component';

describe('ShopCart2Component', () => {
  let component: ShopCart2Component;
  let fixture: ComponentFixture<ShopCart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopCart2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
