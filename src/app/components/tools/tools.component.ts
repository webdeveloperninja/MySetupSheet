import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, map, first } from 'rxjs/operators';

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
  displayedColumns: string[] = ['name', 'diameter', 'notes'];
  dataSource = new MatTableDataSource<any>();

  tools$ = this.activatedRoute.queryParams.pipe(
    filter(params => !!params && !!params['tools']),
    map(params => JSON.parse(params['tools']))
  );

  readonly addTool = this.formBuilder.group({
    name: [],
    diameter: [],
    notes: []
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.tools$.pipe(first()).subscribe(tools => {
      this.dataSource.data = !!tools ? tools : [];
    });
  }

  clear() {
    this.addTool.reset();
    this.dataSource.data = [];
  }

  submit() {
    this.dataSource.data = [...this.dataSource.data, this.addTool.value];
    this.addTool.reset();

    const params = { tools: JSON.stringify(this.dataSource.data) };

    this.router.navigate(['.'], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });

    this.snackBar.open('Successfully added tool', null, { duration: 5000 });
  }

  get hasTools(): boolean {
    return !!this.dataSource.data && this.dataSource.data.length > 0;
  }
}
