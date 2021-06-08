import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewGuidesComponent } from './brew-guides.component';

describe('BrewGuidesComponent', () => {
  let component: BrewGuidesComponent;
  let fixture: ComponentFixture<BrewGuidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrewGuidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
