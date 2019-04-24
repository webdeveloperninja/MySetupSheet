import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map, share, tap, debounceTime } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-setup-sheet',
  templateUrl: './setup-sheet.component.html',
  styleUrls: ['./setup-sheet.component.scss']
})
export class SetupSheetComponent implements OnInit {
  pdfDataUrl: any = null;

  readonly setupSheet = this.formBuilder.group({
    partName: [],
    partNumber: [],
    customer: [],
    machine: [],
    material: []
  });

  constructor(private readonly formBuilder: FormBuilder, private readonly sanitizer: DomSanitizer) {}

  onSubmit() {
    this.renderChanges();
  }

  private renderChanges() {
    const { vfs } = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;

    const documentContext = {
      content: [
        {
          text: `Part: ${this.setupSheet.controls.partName.value} - # ${this.setupSheet.controls.partNumber.value} - Material: ${
            this.setupSheet.controls.material.value
          }`,
          style: 'header'
        },
        { text: `Customer: ${this.setupSheet.controls.customer.value}`, style: 'header' },
        { text: `Machine: ${this.setupSheet.controls.machine.value}`, style: 'header' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    };

    pdfMake.createPdf(documentContext).getDataUrl(url => {
      this.pdfDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  ngOnInit() {
    this.setupSheet.valueChanges
      .pipe(
        debounceTime(500),
        tap(_ => {
          this.renderChanges();
        })
      )
      .subscribe();
  }
}
