import { Component } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { SurfaceFeetCalculations } from 'src/app/core/surface-feet';
import { SurfaceFeetResponse } from 'src/app/core/surface-feet-response';
import { SurfaceFeetQuery } from './surface-feet-query';
import { SurfaceFeetForm } from './surface-feet.form';

@Component({
  selector: 'app-surface-feet-form',
  templateUrl: './surface-feet-form.component.html',
  providers: [SurfaceFeetForm, SurfaceFeetCalculations, SurfaceFeetQuery]
})
export class SurfaceFeetFormComponent {
  readonly form = this.surfaceFeetForm.form;
  readonly diameterInput$ = this.surfaceFeetForm.diameterInput$;
  readonly rpmInput$ = this.surfaceFeetForm.rpmInput$;

  readonly diameterRouteChange = this.surfaceFeetQuery.diameterChange;
  readonly rpmRouteChange = this.surfaceFeetQuery.rpmChange;

  readonly surfaceFeetPerMinute$ = this.surfaceFeetCalculations.getSurfaceFeetPerMinute(this.diameterInput$, this.rpmInput$).pipe(
    tap(surfaceFeetPerMinute => this.navigateToCurrentValue(surfaceFeetPerMinute)),
    map(surfaceFeetResponse => surfaceFeetResponse.surfaceFeet)
  );

  private navigateToCurrentValue(surfaceFeetPerMinute: SurfaceFeetResponse) {
    this.surfaceFeetQuery.navigate({
      rpm: surfaceFeetPerMinute.rpm,
      diameter: surfaceFeetPerMinute.diameter,
      surfaceFeet: surfaceFeetPerMinute.surfaceFeet
    });
  }

  constructor(
    private readonly surfaceFeetForm: SurfaceFeetForm,
    private readonly surfaceFeetCalculations: SurfaceFeetCalculations,
    private readonly surfaceFeetQuery: SurfaceFeetQuery
  ) {}
}
