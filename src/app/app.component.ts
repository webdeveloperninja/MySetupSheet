import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  private onDestroy$ = new Subject();

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
