import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftSubsComponent } from './gift-subs.component';

describe('GiftSubsComponent', () => {
  let component: GiftSubsComponent;
  let fixture: ComponentFixture<GiftSubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftSubsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftSubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
