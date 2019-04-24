import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupSheetComponent } from './setup-sheet.component';

describe('SetupSheetComponent', () => {
  let component: SetupSheetComponent;
  let fixture: ComponentFixture<SetupSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
