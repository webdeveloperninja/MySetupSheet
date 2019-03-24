import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurfaceFeetComponent } from './surface-feet/surface-feet.component';

const routes: Routes = [{ path: '', component: SurfaceFeetComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
