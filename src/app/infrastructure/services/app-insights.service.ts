import { Injectable } from '@angular/core';
import { AppInsights } from 'applicationinsights-js';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AppInsightsService {
  constructor(private readonly settings: SettingsService) {
    if (!AppInsights.config) {
      const config = {
        instrumentationKey: settings.get.applicationInsights.instrumentationKey
      };

      AppInsights.downloadAndSetup(config);
    }
  }

  logPageView(name?: string, url?: string, properties?: any, measurements?: any, duration?: number) {
    AppInsights.trackPageView(name, url, properties, measurements, duration);
  }

  logError(error: Error) {
    AppInsights.trackException(error);
  }
}
