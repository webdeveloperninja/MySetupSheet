import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppInsights } from 'applicationinsights-js';

@Injectable({
  providedIn: 'root'
})
export class AppInsightsService {
  private config: Microsoft.ApplicationInsights.IConfig = {
    instrumentationKey: environment.appInsightsInstrumentationKey
  };

  init() {
    if (!AppInsights.config) {
      console.log('download and setup', this.config);
      AppInsights.downloadAndSetup(this.config);
    }
  }

  logPageView(name?: string, url?: string, properties?: any, measurements?: any, duration?: number) {
    AppInsights.trackPageView(name, url, properties, measurements, duration);
  }
}
