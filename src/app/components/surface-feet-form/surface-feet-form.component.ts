import { Component } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { SurfaceFeet } from 'src/app/core/surface-feet';
import { SurfaceFeetResponse } from 'src/app/core/surface-feet-response';
import { SurfaceFeetQuery } from './surface-feet-query';
import { SurfaceFeetForm } from './surface-feet.form';

@Component({
  selector: 'app-surface-feet-form',
  templateUrl: './surface-feet-form.component.html',
  providers: [SurfaceFeetForm, SurfaceFeet, SurfaceFeetQuery]
})
export class SurfaceFeetFormComponent {
  readonly surfaceFeetForm = this.surfaceFeetFormClient.form;
  readonly diameterInput$ = this.surfaceFeetFormClient.diameterInput$;
  readonly rpmInput$ = this.surfaceFeetFormClient.rpmInput$;

  readonly diameterRouteChange = this.surfaceFeetQuery.diameterChange;
  readonly rpmRouteChange = this.surfaceFeetQuery.rpmChange;

  readonly surfaceFeetPerMinute$ = this.surfaceFeet.getSurfaceFeetPerMinute(this.diameterInput$, this.rpmInput$).pipe(
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
    private readonly surfaceFeetFormClient: SurfaceFeetForm,
    private readonly surfaceFeet: SurfaceFeet,
    private readonly surfaceFeetQuery: SurfaceFeetQuery
  ) {}
}
