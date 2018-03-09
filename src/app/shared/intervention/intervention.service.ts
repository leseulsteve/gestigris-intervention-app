import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/distinctUntilChanged';
import { assign, filter, chain, groupBy } from 'lodash';
import * as moment from 'moment';

import { interventions as interventionsMock } from './intervention.mocks';

import { EtablissementService, Etablissement } from '@app/shared/etablissement';
import { Intervention, InterventionStatus } from './intervention';

export interface PlageIntervention { etablissement: Etablissement; interventions: Intervention[]; }

@Injectable()
export class InterventionService {

  interventions$: Observable<Intervention[]>;
  plagesInterventions$: Observable<PlageIntervention[]>;

  constructor(private etablissementService: EtablissementService) {

    this.interventions$ = combineLatest(
      interventionsMock
        .map(intervention => {
          return this.getEtablissement(intervention.etablissementId)
            .map(etablissement => {
              return this.handleStatusChange(assign(intervention, {
                status$: new BehaviorSubject(intervention.status),
                etablissement: etablissement
              }));
            });
        }))
      .publishReplay(1)
      .refCount();

    this.plagesInterventions$ = this.interventions$
      .map(interventions => {
        return chain(interventions)
          .groupBy(intervention => intervention.etablissement._id)
          .map((interventions, etablissementId) => {
            return chain(interventions)
              .groupBy(intervention => moment(intervention.date).startOf('day').format())
              .map(interventions => {
                return {
                  etablissement: interventions[0].etablissement,
                  interventions: interventions
                };
              })
              .value();
          })
          .flatten()
          .value();
      });
  }

  private getEtablissement(etablissementId: string): Observable<Etablissement> {
    return this.etablissementService.etablissements$
      .mergeMap(etablissements => filter(etablissements, etablissement => etablissement._id === etablissementId));
  }

  private handleStatusChange(intervention: Intervention): Intervention {
    console.log('handleStatusChange');
    intervention.status$
      .skip(1)
      .distinctUntilChanged()
      .subscribe(status => {
        console.log(`STATUS CHANGE [${InterventionStatus[status]}]`, intervention);
      });
    return intervention;
  }
}
