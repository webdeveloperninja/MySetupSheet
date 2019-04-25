import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  tools: any[] = [];
  displayedColumns: string[] = ['name', 'diameter', 'material', 'stickout', 'offestHeight', 'cutterCompensation'];

  dataSource = new MatTableDataSource<any>();
  @Input() initialTools: any[];
  @Output() toolsChange = new EventEmitter<any[]>();

  readonly addTool = this.formBuilder.group({
    name: [],
    diameter: [],
    material: [],
    stickout: [],
    offestHeight: [],
    cutterCompensation: []
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.dataSource.data = !!this.initialTools ? this.initialTools : [];
  }

  submit() {
    this.dataSource.data = [...this.dataSource.data, this.addTool.value];
    this.toolsChange.emit(this.dataSource.data);
  }

  get hasTools(): boolean {
    return !!this.dataSource.data && this.dataSource.data.length > 0;
  }
}
