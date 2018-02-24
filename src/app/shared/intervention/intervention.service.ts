import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { Intervention } from './intervention';

@Injectable()
export class InterventionService {

  interventions$: Observable<Intervention[]>;

  constructor() {
    this.interventions$ = of([

      { etablissementId: '1' }
    ]);
  }

}
