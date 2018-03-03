import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';


import { Intervention, InterventionStatus } from './intervention';

@Injectable()
export class InterventionService {

  interventions$: BehaviorSubject<Intervention[]>;

  interventions: Intervention[] =
  [{ _id:'1', etablissementId: '1', date: new Date ('2000-01-01'), status: new BehaviorSubject(InterventionStatus.Open)},
  { _id:'2',etablissementId: '1', date: new Date ('2000-01-02'), status:new BehaviorSubject( InterventionStatus.Pending)},
  {_id:'3', etablissementId: '1', date: new Date ('2000-01-03'), status: new BehaviorSubject(InterventionStatus.Confirmed)},
  {_id:'4', etablissementId: '1', date: new Date ('2000-01-04'), status:new BehaviorSubject( InterventionStatus.Denied)}
];

  constructor() {
    this.interventions$ = new BehaviorSubject<Intervention[]>(this.interventions);
  }
}
