import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import { debounceTime, tap, map, filter } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

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
export class SetupSheetComponent implements OnInit {
  pdfDataUrl: any = null;
  tools: Tool[] = [];
  mode = 'push';

  tools$ = this.activatedRoute.queryParams.pipe(
    filter(params => !!params && !!params['tools']),
    map(params => JSON.parse(params['tools']))
  );

  readonly setupSheet = this.formBuilder.group({
    partName: [],
    partNumber: [],
    customer: [],
    machine: [],
    material: []
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  onSubmit() {
    this.renderChanges();
  }

  onToolsChange(tools) {
    const params = { tools: JSON.stringify(tools) };

    this.router.navigate(['.'], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });

    this.renderChanges();
  }

  private renderChanges() {
    const { vfs } = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;

    const tools: [] | null = !!this.activatedRoute.snapshot.queryParams['tools']
      ? JSON.parse(this.activatedRoute.snapshot.queryParams['tools'])
      : null;

    const documentContext = {
      content: [
        {
          text: `Part Name: ${this.activatedRoute.snapshot.queryParamMap.get('partName')}`,
          style: 'header'
        },
        {
          text: `Part Number: ${this.activatedRoute.snapshot.queryParamMap.get('partNumber')}`,
          style: 'header'
        },
        { text: `Material: ${this.setupSheet.controls.material.value}`, style: 'header' },
        { text: `Customer: ${this.activatedRoute.snapshot.queryParamMap.get('customer')}`, style: 'header' },
        { text: `Machine: ${this.activatedRoute.snapshot.queryParamMap.get('machine')}`, style: 'header' },
        {
          table: {
            body: [['Tool Name', 'Tool Diameter', 'Tool Material', 'Stickout', 'Offset H#', 'Cutter Comp']]
          }
        }
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

    if (!!tools) {
      tools.forEach((tool: any) => {
        const toolRow = [tool.name, tool.diameter, tool.material, tool.stickout, tool.offestHeight, tool.cutterCompensation];
        documentContext.content[documentContext.content.length - 1].table.body.push(toolRow);
      });
    }

    pdfMake.createPdf(documentContext).getDataUrl(url => {
      this.pdfDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  ngOnInit() {
    this.setupSheet.valueChanges
      .pipe(
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
      !!params.get('material')
    ) {
      this.setupSheet.controls.partName.setValue(params.get('partName'));
      this.setupSheet.controls.partNumber.setValue(params.get('partNumber'));
      this.setupSheet.controls.customer.setValue(params.get('customer'));
      this.setupSheet.controls.machine.setValue(params.get('machine'));
      this.setupSheet.controls.material.setValue(params.get('material'));
    }
  }

  clear() {
    this.setupSheet.reset();
    this.router.navigate(['.'], {
      queryParams: null,
      queryParamsHandling: 'merge'
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
