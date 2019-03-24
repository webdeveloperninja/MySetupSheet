import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CncCalculatorComponent } from './components/cnc-calculator/cnc-calculator.component';

const routes: Routes = [{ path: '', component: CncCalculatorComponent }, { path: 'test', component: CncCalculatorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
