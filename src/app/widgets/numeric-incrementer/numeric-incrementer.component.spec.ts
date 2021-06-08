import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericIncrementerComponent } from './numeric-incrementer.component';

describe('NumericIncrementerComponent', () => {
  let component: NumericIncrementerComponent;
  let fixture: ComponentFixture<NumericIncrementerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumericIncrementerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericIncrementerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
