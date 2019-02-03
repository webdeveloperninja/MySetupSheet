import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppInsights } from 'applicationinsights-js';

const instrumentationKey: string = environment.appInsightsInstrumentationKey;

@Injectable({
  providedIn: 'root'
})
export class AppInsightsService {
  constructor() {
    if (!AppInsights.config) {
      AppInsights.downloadAndSetup(this.config);
    }
  }

  private config: Microsoft.ApplicationInsights.IConfig = {
    instrumentationKey
  };

  logPageView(name?: string, url?: string, properties?: any, measurements?: any, duration?: number) {
    AppInsights.trackPageView(name, url, properties, measurements, duration);
  }
}
