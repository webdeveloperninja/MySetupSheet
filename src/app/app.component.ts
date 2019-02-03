import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { environment } from '../environments/environment';
import { SetConfiguration } from './infrastructure/actions/configuration.actions';
import { Configuration } from './infrastructure/models/configuration';
import { State } from './infrastructure/reducers/configuration.reducers';
import * as fromCore from './infrastructure/reducers/configuration.reducers';
import { AppInsightsService } from './infrastructure/services/app-insights.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'spa';
  constructor(private readonly store: Store<State>, private readonly _logger: AppInsightsService) {}

  isProduction$ = this.store.pipe(select(fromCore.getIsProduction));

  ngOnInit() {
    console.log(environment);
    const configuration: Configuration = {
      isProduction: environment.production,
      appInsightsInstrumentationKey: environment.appInsightsInstrumentationKey
    };

    this.store.dispatch(new SetConfiguration({ configuration }));
    this._logger.init();
    this._logger.logPageView('Page View');
  }
}
