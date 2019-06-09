import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppInsightService } from './core/services/app-insights.service';
declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  private onDestroy$ = new Subject();

  constructor(private readonly router: Router, private readonly appInsights: AppInsightService) {
    this.router.events.pipe(takeUntil(this.onDestroy$)).subscribe(event => {
      if (event instanceof NavigationEnd && !!ga) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');

        this.appInsights.logPageView('Root');
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
