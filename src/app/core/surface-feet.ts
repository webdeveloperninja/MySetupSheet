import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SurfaceFeetResponse } from './surface-feet-response';

@Injectable()
export class SurfaceFeetCalculations {
  getSurfaceFeetPerMinute(diameter$: Observable<number>, rpm$: Observable<number>): Observable<SurfaceFeetResponse> {
    return combineLatest(diameter$, rpm$).pipe(map(([diameter, rpm]) => this.toSurfaceFeetPerMinuteResponse(diameter, rpm)));
  }

  private toSurfaceFeetPerMinuteResponse(diameter: number, rpm: number): SurfaceFeetResponse {
    return {
      diameter,
      rpm,
      surfaceFeet: this.calculateSurfaceFeetPerMinute(diameter, rpm)
    };
  }

  private calculateSurfaceFeetPerMinute(diameter, rpm) {
    return (diameter * rpm) / 3.82;
  }
}
