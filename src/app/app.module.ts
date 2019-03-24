import { HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { GlobalErrorHandler } from './infrastructure/services/global-error-handler.service';
import { SurfaceFeetFormComponent } from './components/surface-feet-form/surface-feet-form.component';
import { CncCalculatorComponent } from './components/cnc-calculator/cnc-calculator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, SurfaceFeetFormComponent, CncCalculatorComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, InfrastructureModule, ReactiveFormsModule, CommonModule],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule {}
