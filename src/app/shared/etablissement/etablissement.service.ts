import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

import { filter } from 'lodash';

import { Etablissement } from './etablissement';
import { InterventionService, Intervention } from '@app/shared/intervention';

@Injectable()
export class EtablissementService {

  public etablissements$: Observable<Etablissement[]>;

  constructor(private interventionService: InterventionService) {

    this.etablissements$ = of([{
      _id: '1', 
      description: 'École secondaire de Neufchâtel',
      tags: ['Secondaire', 'Hotdog'],
      interventions$: this.getInterventions('1'),
    }]);
  }

  private getInterventions(etablissementId: string): Observable<Intervention[]> {
    return this.interventionService.interventions$
      .map(interventions => filter(interventions, intervention => intervention.etablissementId === etablissementId));
  }
}
