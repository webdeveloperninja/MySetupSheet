import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

export interface SurfaceFeetResponse {
  surfaceFeet: number;
  diameter: number;
  rpm: number;
}

@Injectable()
export class SurfaceFeetCalculations {
  private readonly diameterChange = this.route.queryParams.pipe(
    filter(params => !!params['diameter']),
    map(params => +params['diameter'])
  );

  private readonly rpmChange = this.route.queryParams.pipe(
    filter(params => !!params['rpm']),
    map(params => +params['rpm'])
  );

  constructor(private readonly route: ActivatedRoute) {}

  getSurfaceFeetPerMinute(): Observable<SurfaceFeetResponse> {
    return combineLatest(this.diameterChange, this.rpmChange).pipe(
      map(([diameter, rpm]) => this.toSurfaceFeetPerMinuteResponse(diameter, rpm))
    );
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
