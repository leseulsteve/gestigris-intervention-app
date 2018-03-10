import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { chain, compact } from 'lodash';
import * as moment from 'moment';

import { Etablissement } from '@app/etablissement';
import { Intervention, InterventionStatus } from './intervention';
import { InterventionService } from './intervention.service';

export interface PlageIntervention { _id: string; etablissement: Etablissement; interventions: Intervention[]; }

@Injectable()
export class PlageInterventionService {

  plagesInterventions$: Observable<PlageIntervention[]>;
  showcasedPlagesInterventions$: Observable<PlageIntervention[]>;

  constructor(private interventionService: InterventionService) {

    this.plagesInterventions$ = this.interventionService.interventions$
      .map(interventions => chain(interventions)
        .groupBy(intervention => intervention.etablissement._id)
        .map((interventions, etablissementId) => ({
          _id: interventions[0]._id + interventions[0].etablissement._id,
          etablissement: interventions[0].etablissement,
          interventions: interventions
        }))
        .flatten()
        .value());

    this.showcasedPlagesInterventions$ = this.plagesInterventions$
      .map(plages => this.splitPlagesByDay(plages))
      .mergeMap(plages => combineLatest(plages
        .map(plage => combineLatest(plage.interventions.map(intervention => intervention.status$))
          .map(interventionsStatuses =>
            interventionsStatuses.filter(status => status === InterventionStatus.Open).length > 0)
          .map(hasOpenStatus => { if (hasOpenStatus) { return plage; } }))))
      .map(compact);
  }

  private splitPlagesByDay(plages: PlageIntervention[]): PlageIntervention[] {
    return chain(plages)
      .map(plage => chain(plage.interventions)
        .groupBy(intervention => moment(intervention.date).startOf('day').format())
        .map((interventions, date) => ({
          _id: plage._id + date,
          etablissement: plage.etablissement,
          interventions: interventions
        }))
        .value())
      .flatten()
      .value();
  }

  accept(accept: boolean, plageIntervention: PlageIntervention) {
    console.log(accept, plageIntervention);
  }

}
