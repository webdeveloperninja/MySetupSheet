import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurfaceFeetFormComponent } from './components/surface-feet-form/surface-feet-form.component';

const routes: Routes = [{ path: '', component: SurfaceFeetFormComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
