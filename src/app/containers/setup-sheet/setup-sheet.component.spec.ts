import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SetupSheetComponent } from './setup-sheet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/theme.module';
import { ToolsComponent } from 'src/app/components/tools/tools.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';

describe('SetupSheetComponent', () => {
  let component: SetupSheetComponent;
  let fixture: ComponentFixture<SetupSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ThemeModule, RouterTestingModule, BrowserAnimationsModule, ClipboardModule],
      declarations: [SetupSheetComponent, ToolsComponent]
    }).compileComponents();
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
