import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickCollectBottomSheetComponent } from './click-collect-bottom-sheet.component';

describe('ClickCollectBottomSheetComponent', () => {
  let component: ClickCollectBottomSheetComponent;
  let fixture: ComponentFixture<ClickCollectBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickCollectBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickCollectBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
