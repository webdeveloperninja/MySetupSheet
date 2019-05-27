import { Component, OnInit, OnDestroy } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SideNavService } from '../../core/services/side-nav.service';
import { DocumentContextClient } from '../../containers/setup-sheet/document-context-client';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmailReportComponent } from '../email-report/email-report.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit, OnDestroy {
  constructor(
    private readonly sideNav: SideNavService,
    private readonly documentClient: DocumentContextClient,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
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

  onOpenEmailDialog() {
    this.dialog.open(EmailReportComponent);
  }

  onCopySuccess() {
    this.snackBar.open('Successfully copied to clipboard', null, { duration: 3500 });
  }

  openPdf() {
    const documentContext = this.documentClient.getDocumentContext();
    pdfMake.createPdf(documentContext).open();
  }
}
