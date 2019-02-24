import { Component } from '@angular/core';
import { SurfaceFeetForm } from './surface-feet.form';
import { SurfaceFeet } from 'src/app/core/surface-feet';

@Component({
  selector: 'app-surface-feet-form',
  templateUrl: './surface-feet-form.component.html',
  providers: [SurfaceFeetForm, SurfaceFeet]
})
export class SurfaceFeetFormComponent {
  surfaceFeetForm = this.surfaceFeetFormClient.form;
  diameter$ = this.surfaceFeetFormClient.diameter$;
  rpm$ = this.surfaceFeetFormClient.rpm$;

  surfaceFeetPerMinute$ = this.surfaceFeet.getSurfaceFeetPerMinute(this.diameter$, this.rpm$);

  constructor(private readonly surfaceFeetFormClient: SurfaceFeetForm, private readonly surfaceFeet: SurfaceFeet) {}
}
