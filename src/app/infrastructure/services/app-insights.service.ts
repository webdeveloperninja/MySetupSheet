import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppInsights } from 'applicationinsights-js';

@Injectable({
  providedIn: 'root'
})
export class AppInsightsService {
  init() {
    if (!AppInsights.config) {
      const config = {
        instrumentationKey: environment.appInsightsInstrumentationKey
      };
      AppInsights.downloadAndSetup(config);
    }
  }

  logPageView(name?: string, url?: string, properties?: any, measurements?: any, duration?: number) {
    AppInsights.trackPageView(name, url, properties, measurements, duration);
  }
}