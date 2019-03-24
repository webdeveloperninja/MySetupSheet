import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class SurfaceFeetQuery {
  readonly diameterChange = this.route.queryParams.pipe(filter(param => param['diameter']));
  readonly rpmChange = this.route.queryParams.pipe(filter(param => param['rpm']));

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  navigate(queryParams: Params) {
    this.router.navigate(['.'], {
      queryParams: {
        ...queryParams
      }
    });
  }
}
