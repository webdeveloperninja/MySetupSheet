import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeModule } from '../../theme.module';
import { TopBarComponent } from './top-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ThemeModule, ReactiveFormsModule, RouterTestingModule, NoopAnimationsModule, ClipboardModule],
      declarations: [TopBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
