import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonSelectionComponent } from './ribbon-selection.component';

describe('RibbonSelectionComponent', () => {
  let component: RibbonSelectionComponent;
  let fixture: ComponentFixture<RibbonSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RibbonSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RibbonSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
