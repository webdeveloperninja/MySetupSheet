import { ErrorHandler, Injectable } from '@angular/core';
import { AppInsightsService } from './app-insights.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly appInsights: AppInsightsService) {}

  handleError(error): void {
    console.error(error);
    this.appInsights.logError(error);
  }
}
