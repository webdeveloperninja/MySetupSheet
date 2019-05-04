import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class DocumentContextClient {
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  getDocumentContext() {
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
        { text: `Material: ${this.activatedRoute.snapshot.queryParamMap.get('material')}`, style: 'header' },
        { text: `Customer: ${this.activatedRoute.snapshot.queryParamMap.get('customer')}`, style: 'header' },
        { text: `Machine: ${this.activatedRoute.snapshot.queryParamMap.get('machine')}`, style: 'header' },
        {
          table: {
            body: [['Tool Name', 'Tool Diameter', 'Notes']]
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
        const toolRow = [tool.name, tool.diameter, tool.notes];
        documentContext.content[documentContext.content.length - 1].table.body.push(toolRow);
      });
    }

    return documentContext;
  }
}
