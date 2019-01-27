import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Configuration } from './models/configuration';
import { SetConfiguration } from './actions/configuration.actions';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'spa';
  constructor(private readonly _store: Store<Configuration>) {}

  ngOnInit() {
    const configuration: Configuration = {
      isProduction: environment.production
    };

    this._store.dispatch(new SetConfiguration({ configuration }));
  }
}
