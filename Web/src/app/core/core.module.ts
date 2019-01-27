import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCore from './reducers/configuration.reducers';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('core', fromCore.configurationReducer)]
})
export class CoreModule {}
