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
import { PhotosComponent } from './components/photos/photos.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PhotoCropperComponent } from './components/photo-cropper/photo-cropper.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/enviroments/enviroment.dev';

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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
