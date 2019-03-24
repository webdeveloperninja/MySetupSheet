import { Component } from '@angular/core';
import { SurfaceFeetInteractions } from './surface-feet.interactions';
import { SurfaceFeetCalculations } from './surface-feet.calculations';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-surface-feet-form',
  templateUrl: './surface-feet-form.component.html',
  providers: [SurfaceFeetInteractions, SurfaceFeetCalculations]
})
export class SurfaceFeetFormComponent {
  readonly form = this.interactions.form;
  readonly surfaceFeetPerMinute$ = this.calculations
    .getSurfaceFeetPerMinute()
    .pipe(map(surfaceFeetResponse => surfaceFeetResponse.surfaceFeet));

  constructor(private readonly interactions: SurfaceFeetInteractions, private readonly calculations: SurfaceFeetCalculations) {}
}
