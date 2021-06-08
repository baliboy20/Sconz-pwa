import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlinedLabelComponent } from './outlined-label.component';

describe('OutlinedLabelComponent', () => {
  let component: OutlinedLabelComponent;
  let fixture: ComponentFixture<OutlinedLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutlinedLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlinedLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
