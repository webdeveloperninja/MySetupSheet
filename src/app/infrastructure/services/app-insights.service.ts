import { Injectable } from '@angular/core';
import { AppInsights } from 'applicationinsights-js';

@Injectable({
  providedIn: 'root'
})
export class AppInsightsService {
  init() {
    if (!AppInsights.config) {
      const config = {
        instrumentationKey: '6b4997f7-abf2-4dc7-815a-452ba722ff53'
      };
      AppInsights.downloadAndSetup(config);
    }
  }

  logPageView(name?: string, url?: string, properties?: any, measurements?: any, duration?: number) {
    AppInsights.trackPageView(name, url, properties, measurements, duration);
  }
}
