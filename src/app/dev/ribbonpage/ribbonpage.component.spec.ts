import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonpageComponent } from './ribbonpage.component';

describe('RibbonpageComponent', () => {
  let component: RibbonpageComponent;
  let fixture: ComponentFixture<RibbonpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RibbonpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RibbonpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
