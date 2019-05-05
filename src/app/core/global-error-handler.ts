import { ErrorHandler, Injectable } from '@angular/core';
import { AppInsightService } from './services/app-insights.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly appInsights: AppInsightService) {}
  handleError(error) {
    this.appInsights.logException(error, 'global');
    throw error;
  }
}
