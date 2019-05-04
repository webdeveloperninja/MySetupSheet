import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment.dev';
import { Enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EnviromentService {
  get settings(): Enviroment {
    return environment;
  }
}
