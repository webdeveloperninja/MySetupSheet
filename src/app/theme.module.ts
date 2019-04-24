import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatTableModule],
  exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatTableModule]
})
export class ThemeModule {}
