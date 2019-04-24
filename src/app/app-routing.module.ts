import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupSheetComponent } from './containers/setup-sheet/setup-sheet.component';

const routes: Routes = [{ path: '', component: SetupSheetComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
