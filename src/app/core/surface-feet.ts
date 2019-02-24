import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SurfaceFeet {
  getSurfaceFeetPerMinute(diameter$: Observable<number>, rpm$: Observable<number>): Observable<number> {
    return combineLatest(diameter$, rpm$).pipe(map(this.toSurfaceFeetPerMinute));
  }

  private toSurfaceFeetPerMinute([diameter, rpm]: [number, number]): number {
    return (diameter * rpm) / 3.82;
  }
}
