import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CncCalculatorComponent } from './components/cnc-calculator/cnc-calculator.component';
import { SurfaceFeetFormComponent } from './components/surface-feet-form/surface-feet-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [CncCalculatorComponent, SurfaceFeetFormComponent]
})
export class InfrastructureModule {}
