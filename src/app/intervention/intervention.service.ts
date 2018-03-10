import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skip';

import { assign, chain } from 'lodash';
import * as moment from 'moment';

import { interventions as interventionsMock } from './intervention.mocks';

import { EtablissementService, Etablissement } from '@app/etablissement';
import { Intervention, InterventionStatus } from './intervention';


@Injectable()
export class InterventionService {

  interventions$: Observable<Intervention[]>;

  constructor(private etablissementService: EtablissementService) {

    this.interventions$ = combineLatest(
      chain(interventionsMock)
        .sortBy(intervention => moment(intervention.date).startOf('day').format())
        .map(intervention => this.getEtablissement(intervention.etablissementId)
          .map(etablissement => this.handleStatusChange(assign(intervention, {
            status$: new BehaviorSubject(intervention.status),
            etablissement: etablissement
          }))))
        .value())
      .publishReplay(1)
      .refCount();
  }

  private getEtablissement(etablissementId: string): Observable<Etablissement> {
    return this.etablissementService.etablissements$
      .mergeMap(etablissements => etablissements.filter(etablissement => etablissement._id === etablissementId));
  }

  private handleStatusChange(intervention: Intervention): Intervention {
    intervention.status$
      .skip(1)
      .distinctUntilChanged()
      .subscribe(status => {
        console.log(`STATUS CHANGE [${InterventionStatus[status]}]`, intervention);
      });
    return intervention;
  }
}
