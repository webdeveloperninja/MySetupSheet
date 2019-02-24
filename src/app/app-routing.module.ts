import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CncCalculatorComponent } from './infrastructure/components/cnc-calculator/cnc-calculator.component';

const routes: Routes = [{ path: '', component: CncCalculatorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
