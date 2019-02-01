import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { environment } from '../environments/environment';
import { SetConfiguration } from './core/actions/configuration.actions';
import { Configuration } from './core/models/configuration';
import { State } from './core/reducers/configuration.reducers';
import * as fromCore from './core/reducers/configuration.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'spa';
  constructor(private readonly _store: Store<State>) {}

  isProduction$ = this._store.pipe(select(fromCore.getIsProduction));

  ngOnInit() {
    const configuration: Configuration = {
      isProduction: environment.production
    };

    this._store.dispatch(new SetConfiguration({ configuration }));
  }
}
