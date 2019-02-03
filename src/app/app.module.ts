import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ApplicationInsightsModule, AppInsightsService } from '@markpieszak/ng-application-insights';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    ApplicationInsightsModule.forRoot({
      instrumentationKey: environment.appInsightsInstrumentationKey
    }),
    StoreModule.forRoot({}),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [AppInsightsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
