import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';

import { empty } from 'rxjs/observable/empty';

import 'rxjs/add/operator/mergeMap';
import { flatten } from 'lodash';

import { InterventionService, Intervention, PlageIntervention, InterventionStatus } from '@app/shared/intervention';
import { Etablissement } from '@app/shared/etablissement';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  plageIntervention$: Observable<PlageIntervention[]>;

  constructor(private interventionService: InterventionService) { }

  ngOnInit() {

    this.plageIntervention$ = this.interventionService.plagesInterventions$
      .mergeMap(plages => {
        return combineLatest(plages.map(plage => {
          return combineLatest(plage.interventions.map(intervention => intervention.status$))
            .map(interventionsStatuses =>
              interventionsStatuses.filter(status => status === InterventionStatus.Open).length > 0)
            .map(hasOpenStatus => {
              if (hasOpenStatus) {
                return plage;
              }
            });
        }));

      });

  }

}
