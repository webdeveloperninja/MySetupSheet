import { Component, OnInit, OnDestroy } from '@angular/core';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { DocumentContextClient } from 'src/app/containers/setup-sheet/document-context-client';
import pdfMake from 'pdfmake/build/pdfmake';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit, OnDestroy {
  constructor(
    private readonly sideNav: SideNavService,
    private readonly documentClient: DocumentContextClient,
    private readonly snackBar: MatSnackBar
  ) {}

  get href(): string {
    return window.location.href;
  }

  ngOnInit() {
    this.sideNav.onInit();
  }

  ngOnDestroy() {
    this.sideNav.onDestroy();
  }

  onSideNavChange() {
    this.sideNav.toggleSideNav();
  }

  onCopySuccess() {
    this.snackBar.open('Successfully copied to clipboard', null, { duration: 3500 });
  }

  openPdf() {
    const documentContext = this.documentClient.getDocumentContext();
    pdfMake.createPdf(documentContext).open();
  }
}
