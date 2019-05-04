import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  tools: any[] = [];
  displayedColumns: string[] = ['name', 'diameter', 'notes'];

  dataSource = new MatTableDataSource<any>();
  @Input() initialTools: any[];
  @Output() toolsChange = new EventEmitter<any[]>();

  readonly addTool = this.formBuilder.group({
    name: [],
    diameter: [],
    notes: []
  });

  constructor(private readonly formBuilder: FormBuilder, private readonly snackBar: MatSnackBar) {}

  ngOnInit() {
    this.dataSource.data = !!this.initialTools ? this.initialTools : [];
  }

  clear() {
    this.addTool.reset();
    this.dataSource.data = [];
  }

  submit() {
    this.dataSource.data = [...this.dataSource.data, this.addTool.value];
    this.toolsChange.emit(this.dataSource.data);
    this.addTool.reset();
    this.snackBar.open('Successfully added tool', null, { duration: 5000 });
  }

  get hasTools(): boolean {
    return !!this.dataSource.data && this.dataSource.data.length > 0;
  }
}
