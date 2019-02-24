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

  diameter$: Observable<number> = this.form.controls.diameter.valueChanges.pipe(map(d => Number(d)));
  rpm$: Observable<number> = this.form.controls.rpm.valueChanges.pipe(map(rpm => Number(rpm)));

  get(): FormGroup {
    return this.form;
  }
}
