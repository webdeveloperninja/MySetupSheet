import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppInsightService } from 'src/app/core/services/app-insights.service';
import pdfMake from 'pdfmake/build/pdfmake';
import { BusinessEvent } from 'src/app/business-events';
import { DocumentContextClient } from 'src/app/containers/setup-sheet/document-context-client';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  pdfDataUrl: SafeResourceUrl = null;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly appInsights: AppInsightService,
    private readonly sanitizer: DomSanitizer,
    private readonly documentClient: DocumentContextClient
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.renderChanges();
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

  private renderChanges() {
    this.appInsights.logEvent(BusinessEvent.renderPdf);
    const documentContext = this.documentClient.getDocumentContext();

    pdfMake.createPdf(documentContext).getDataUrl(url => {
      this.pdfDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }
}
