import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

declare let window: any;

const xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    window.appSettings = JSON.parse(this.responseText);

    if (window.appSettings.production) {
      enableProdMode();
    }

    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
  }
};

xmlHttp.open('GET', 'assets/data/settings.json', true);
xmlHttp.send();
