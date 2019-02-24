import { Component } from '@angular/core';
import { SurfaceFeetForm } from './surface-feet.form';

@Component({
  selector: 'app-surface-feet-form',
  templateUrl: './surface-feet-form.component.html',
  providers: [SurfaceFeetForm]
})
export class SurfaceFeetFormComponent {
  surfaceFeetForm = this.surfaceFeet.form;
  diameter$ = this.surfaceFeet.diameter$;
  surfaceFeetPerMinute$ = this.surfaceFeet.surfaceFeetPerMinute$;

  constructor(private readonly surfaceFeet: SurfaceFeetForm) {}
}
