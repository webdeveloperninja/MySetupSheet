import { Component, OnInit } from '@angular/core';
import { AppInsightsService } from './infrastructure/services/app-insights.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly _logger: AppInsightsService) {}

  ngOnInit() {
    this._logger.init();
    this._logger.logPageView('Page View');
  }
}
