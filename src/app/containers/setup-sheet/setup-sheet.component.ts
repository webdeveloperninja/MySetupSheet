import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import { Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { BusinessEvent } from 'src/app/business-events';
import { ToolsComponent } from 'src/app/components/tools/tools.component';
import { AppInsightService } from 'src/app/core/services/app-insights.service';
import { EnviromentService } from 'src/app/core/services/enviroment.service';
import { Enviroment } from 'src/enviroments/enviroment';
import { DocumentContextClient } from './document-context-client';

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
  templateUrl: './setup-sheet.component.html',
  styleUrls: ['./setup-sheet.component.scss']
})
export class SetupSheetComponent implements OnInit, OnDestroy {
  settings: Enviroment = this.enviroment.settings;
  pdfDataUrl: SafeResourceUrl = null;
  showDetailsTab = true;
  showReportTab = true;
  isSideNavOpened = true;
  selectedTabIndex = null;
  tools: Tool[] = [];

  tools$ = this.activatedRoute.queryParams.pipe(
    filter(params => !!params && !!params['tools']),
    map(params => JSON.parse(params['tools']))
  );

  @ViewChild(ToolsComponent) toolsComponent: ToolsComponent;

  readonly setupSheet = this.formBuilder.group({
    partName: [],
    partNumber: [],
    customer: [],
    machine: [],
    material: []
  });

  private onDestroy$ = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly mediaObserver: MediaObserver,
    private readonly documentClient: DocumentContextClient,
    private readonly enviroment: EnviromentService,
    private readonly appInsights: AppInsightService,
    private readonly snackBar: MatSnackBar
  ) {}

  toggleSideNav() {
    this.isSideNavOpened ? (this.isSideNavOpened = false) : (this.isSideNavOpened = true);

    const params = { opened: this.isSideNavOpened ? 1 : 0 };
    this.router.navigate(['.'], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  onSubmit() {
    this.renderChanges();
  }

  selectedTabChange(tab) {
    if (!!tab && tab.index === 0 && this.hasParams) {
      setTimeout(() => this.renderChanges(), 600);
    }

    const params: Params = { tab: tab.index };

    this.router.navigate(['.'], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  onToolsChange(tools) {
    const params = { tools: JSON.stringify(tools) };

    this.router.navigate(['.'], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });

    this.renderChanges();
  }

  openPdf() {
    const documentContext = this.documentClient.getDocumentContext();
    pdfMake.createPdf(documentContext).open();
  }

  get href(): string {
    return window.location.href;
  }

  copied() {
    this.snackBar.open('Successfully copied to clipboard', null, { duration: 3500 });
  }

  ngOnInit() {
    this.mediaObserver.media$.pipe(takeUntil(this.onDestroy$)).subscribe(m => {
      if (m.mqAlias === 'sm' || m.mqAlias === 'xs') {
        this.showDetailsTab = true;
        this.showReportTab = false;
      } else {
        this.showDetailsTab = false;
        this.showReportTab = true;
      }
    });

    this.setupSheet.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        debounceTime(200),
        tap(value => {
          this.router.navigate(['.'], {
            queryParams: value,
            queryParamsHandling: 'merge'
          });
        }),
        debounceTime(400),
        tap(_ => {
          this.renderChanges();
        })
      )
      .subscribe();

    const params = this.activatedRoute.snapshot.queryParamMap;

    if (
      !!params.get('partName') ||
      !!params.get('partNumber') ||
      !!params.get('customer') ||
      !!params.get('machine') ||
      !!params.get('material') ||
      !!params.get('tools')
    ) {
      this.setupSheet.controls.partName.setValue(params.get('partName'));
      this.setupSheet.controls.partNumber.setValue(params.get('partNumber'));
      this.setupSheet.controls.customer.setValue(params.get('customer'));
      this.setupSheet.controls.machine.setValue(params.get('machine'));
      this.setupSheet.controls.material.setValue(params.get('material'));
    }

    if (!!params.get('opened')) {
      const openedIndex = +params.get('opened');
      if (openedIndex === 1) {
        this.isSideNavOpened = true;
      }

      if (openedIndex === 0) {
        this.isSideNavOpened = false;
      }
    }

    if (!!params.get('tab')) {
      const tab = +params.get('tab');
      this.selectedTabIndex = tab;
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  clear() {
    this.setupSheet.reset();
    this.router.navigate(['.'], {
      queryParams: {
        tools: null
      }
    });
    this.toolsComponent.clear();

    this.renderChanges();
  }

  private renderChanges() {
    this.appInsights.logEvent(BusinessEvent.renderPdf);
    const documentContext = this.documentClient.getDocumentContext();

    pdfMake.createPdf(documentContext).getDataUrl(url => {
      this.pdfDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  get hasParams(): boolean {
    const params = this.activatedRoute.snapshot.queryParamMap;

    return (
      !!params.get('material') ||
      !!params.get('machine') ||
      !!params.get('customer') ||
      !!params.get('partNumber') ||
      !!params.get('partName')
    );
  }
}
