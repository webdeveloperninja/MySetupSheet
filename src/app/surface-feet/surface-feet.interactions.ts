import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, tap, filter, first } from 'rxjs/operators';

@Injectable()
export class SurfaceFeetInteractions {
  readonly form = this.formBuilder.group({
    diameter: [],
    rpm: []
  });

  private readonly initialParam: Subscription = this.route.queryParams
    .pipe(
      filter(params => !!params['diameter'] && !!params['rpm']),
      first(),
      tap(params => {
        this.form.controls.diameter.setValue(params['diameter']);
        this.form.controls.rpm.setValue(params['rpm']);
      })
    )
    .subscribe();

  private readonly diameterInput: Subscription = this.form.controls.diameter.valueChanges
    .pipe(
      map(diameter => Number(diameter)),
      tap(diameter => this.navigate({ diameter }))
    )
    .subscribe();

  private readonly rpmInputInput: Subscription = this.form.controls.rpm.valueChanges
    .pipe(
      map(rpm => Number(rpm)),
      tap(rpm => this.navigate({ rpm }))
    )
    .subscribe();

  constructor(private readonly formBuilder: FormBuilder, private readonly route: ActivatedRoute, private readonly router: Router) {}

  private navigate(params) {
    this.router.navigate(['.'], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        ...params
      }
    });
  }
}
