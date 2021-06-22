import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZzprogressbuttonComponent } from './zzprogressbutton.component';

describe('ZzprogressbuttonComponent', () => {
  let component: ZzprogressbuttonComponent;
  let fixture: ComponentFixture<ZzprogressbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZzprogressbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZzprogressbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
