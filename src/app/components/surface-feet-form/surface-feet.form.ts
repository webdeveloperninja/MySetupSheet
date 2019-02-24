import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SurfaceFeetForm {
  form = this.formBuilder.group({
    diameter: [],
    rpm: []
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  diameter$: Observable<number> = this.form.controls.diameter.valueChanges.pipe(map(this.toNumber));
  rpm$: Observable<number> = this.form.controls.rpm.valueChanges.pipe(map(this.toNumber));
  surfaceFeetPerMinute$ = combineLatest(this.diameter$, this.rpm$).pipe(map(this.toSurfaceFeetPerMinute));

  get(): FormGroup {
    return this.form;
  }

  private toNumber(input: string): number {
    return Number(input);
  }

  private toSurfaceFeetPerMinute([diameter, rpm]: [number, number]): number {
    return (diameter * rpm) / 3.82;
  }
}
