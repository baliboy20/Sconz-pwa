import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartSideNavComponent } from './shop-cart-side-nav.component';

describe('ShopCartSideNavComponent', () => {
  let component: ShopCartSideNavComponent;
  let fixture: ComponentFixture<ShopCartSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopCartSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCartSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
