import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapVisitComponent } from './map-visit.component';

describe('MapVisitComponent', () => {
  let component: MapVisitComponent;
  let fixture: ComponentFixture<MapVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
