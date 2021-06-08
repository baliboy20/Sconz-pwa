import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownCartListComponent } from './drop-down-cart-list.component';

describe('DropDownCartListComponent', () => {
  let component: DropDownCartListComponent;
  let fixture: ComponentFixture<DropDownCartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownCartListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
