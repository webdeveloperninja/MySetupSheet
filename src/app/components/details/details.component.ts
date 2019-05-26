import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private readonly onDestroy$ = new Subject();
  readonly setupSheet = this.formBuilder.group({
    partName: [],
    partNumber: [],
    customer: [],
    machine: [],
    material: []
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
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

    this.setupSheet.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        debounceTime(200),
        tap(value => {
          this.router.navigate(['.'], {
            queryParams: value,
            queryParamsHandling: 'merge'
          });
        })
      )
      .subscribe();
  }
}
