import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ClipboardModule } from 'ngx-clipboard';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './components/details/details.component';
import { EmailReportComponent } from './components/email-report/email-report.component';
import { PhotoCropperComponent } from './components/photo-cropper/photo-cropper.component';
import { PhotosComponent } from './components/photos/photos.component';
import { ReportComponent } from './components/report/report.component';
import { ToolsComponent } from './components/tools/tools.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SetupSheetComponent } from './containers/setup-sheet/setup-sheet.component';
import { GlobalErrorHandler } from './core/global-error-handler';
import { ThemeModule } from './theme.module';

@NgModule({
  declarations: [
    AppComponent,
    SetupSheetComponent,
    ToolsComponent,
    DetailsComponent,
    TopBarComponent,
    ReportComponent,
    EmailReportComponent,
    PhotosComponent,
    PhotoCropperComponent
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
    ClipboardModule,
    ImageCropperModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true })
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  entryComponents: [EmailReportComponent, PhotoCropperComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
