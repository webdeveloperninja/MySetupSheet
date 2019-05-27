import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetupSheetComponent } from './containers/setup-sheet/setup-sheet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from './theme.module';
import { ToolsComponent } from './components/tools/tools.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClipboardModule } from 'ngx-clipboard';
import { GlobalErrorHandler } from './core/global-error-handler';
import { DetailsComponent } from './components/details/details.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ReportComponent } from './components/report/report.component';
import { EmailReportComponent } from './components/email-report/email-report.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupSheetComponent,
    ToolsComponent,
    DetailsComponent,
    TopBarComponent,
    ReportComponent,
    EmailReportComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    ThemeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    ClipboardModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  entryComponents: [EmailReportComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
