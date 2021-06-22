import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GGCheckoutComponent } from './ggcheckout.component';

describe('GGCheckoutComponent', () => {
  let component: GGCheckoutComponent;
  let fixture: ComponentFixture<GGCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GGCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GGCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
