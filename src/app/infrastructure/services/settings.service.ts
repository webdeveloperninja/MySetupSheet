import { Injectable } from '@angular/core';
import { Settings } from 'src/app/models/settings';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  get get(): Settings {
    return window.appSettings;
  }
}
