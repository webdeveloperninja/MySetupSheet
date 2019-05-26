import { Injectable } from '@angular/core';
import { environment } from '../../..//enviroments/enviroment.dev';
import { Enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EnviromentService {
  get settings(): Enviroment {
    return environment;
  }
}
