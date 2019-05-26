import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  private readonly onDestroy$ = new Subject();
  private readonly isOpenChange = new BehaviorSubject<boolean>(false);
  readonly isOpen$ = this.isOpenChange.asObservable();

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {}

  onInit() {
    const params = this.route.snapshot.queryParamMap;

    if (!!params.get('opened')) {
      const openedIndex = +params.get('opened');
      if (openedIndex === 1) {
        this.isOpenChange.next(true);
      }

      if (openedIndex === 0) {
        this.isOpenChange.next(false);
      }
    }
  }

  onDestroy() {
    this.onDestroy$.next();
  }

  toggleSideNav() {
    if (this.isOpenChange.value) {
      this.isOpenChange.next(false);
    } else {
      this.isOpenChange.next(true);
    }

    const params = { opened: this.isOpenChange.value ? 1 : 0 };
    this.router.navigate(['.'], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }
}
