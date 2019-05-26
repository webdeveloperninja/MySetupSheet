import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { EnviromentService } from 'src/app/core/services/enviroment.service';
import { Enviroment } from 'src/enviroments/enviroment';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';

export interface Tool {
  name: string;
  diameter: string;
  material: string;
  stickout: string;
  offestHeight: string;
  cutterCompensation: string;
}

@Component({
  selector: 'app-setup-sheet',
  templateUrl: './setup-sheet.component.html'
})
export class SetupSheetComponent implements OnInit, OnDestroy {
  readonly settings: Enviroment = this.enviroment.settings;
  readonly isSideNavOpen$ = this.activatedRoute.queryParams.pipe(map(params => (Number(params['opened']) === 0 ? false : true)));
  private readonly onDestroy$ = new Subject();

  showDetailsTab = true;
  showReportTab = true;
  selectedTabIndex = null;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly enviroment: EnviromentService,
    private readonly mediaObserver: MediaObserver
  ) {}

  selectedTabChange(tab) {
    const params: Params = { tab: tab.index };

    this.router.navigate(['.'], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.queryParamMap;
    if (!!params.get('tab')) {
      const tab = +params.get('tab');
      this.selectedTabIndex = tab;
    }

    this.mediaObserver.media$.pipe(takeUntil(this.onDestroy$)).subscribe(m => {
      if (m.mqAlias === 'sm' || m.mqAlias === 'xs') {
        this.showDetailsTab = true;
        this.showReportTab = false;
      } else {
        this.showDetailsTab = false;
        this.showReportTab = true;
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
