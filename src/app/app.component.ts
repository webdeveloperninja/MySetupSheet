import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { environment } from '../environments/environment';
import { SetConfiguration } from './core/actions/configuration.actions';
import { Configuration } from './core/models/configuration';
import { State } from './core/reducers/configuration.reducers';
import * as fromCore from './core/reducers/configuration.reducers';
import { AppInsightsService } from '@markpieszak/ng-application-insights';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'spa';
  constructor(private readonly store: Store<State>, private readonly appInsightsService: AppInsightsService) {}

  isProduction$ = this.store.pipe(select(fromCore.getIsProduction));

  ngOnInit() {
    this.appInsightsService.init();

    const configuration: Configuration = {
      isProduction: environment.production
    };

    this.store.dispatch(new SetConfiguration({ configuration }));
  }
}
