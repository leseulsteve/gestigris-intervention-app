import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { Intervention } from './intervention';

@Injectable()
export class InterventionService {

  interventions$: Observable<Intervention[]>;

  constructor() {
    this.interventions$ = of([
      { etablissementId: '1', date: new Date ('2000-01-01') },
      { etablissementId: '1', date: new Date ('2000-01-02') },
      { etablissementId: '1', date: new Date ('2000-01-03') },
      { etablissementId: '1', date: new Date ('2000-01-04') }
    ]);
  }

}
