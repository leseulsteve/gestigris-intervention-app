import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { includes } from 'lodash';

import { Etablissement } from '@app/etablissement';
import { InterventionStatus, Intervention } from './intervention';
import { PlageIntervention } from './plage-intervention.service';
import { InterventionService } from '@app/intervention';

@Component({
  selector: 'app-plage-intervention-card',
  templateUrl: './plage-intervention-card.component.html',
  styleUrls: ['./plage-intervention-card.component.scss']
})
export class PlageInterventionCardComponent {

  @Input() plageIntervention: PlageIntervention;
  @Input() status: InterventionStatus[];

  constructor() { }

  getInterventionStatusIcon(interventionStatus: InterventionStatus): string {

    switch (interventionStatus) {
      case InterventionStatus.Open:
        return 'unlock';

      case InterventionStatus.Pending:
        return 'heart';

      case InterventionStatus.Confirmed:
        return 'checkmark-circle';

      case InterventionStatus.Denied:
        return 'close-circle';
    }
  }

  getIsLiked(intervention: Intervention): Observable<boolean> {
    return intervention.status$
      .map(status => includes([
        InterventionStatus.Pending,
        InterventionStatus.Confirmed,
        InterventionStatus.Denied
      ], status));
  }

  getStatusLabel(intervention: Intervention): Observable<string> {
    return intervention.status$
      .map(status => {
        switch (status) {
          case InterventionStatus.Open:
            return 'ouvert';
          case InterventionStatus.Pending:
            return 'ouvert';
          case InterventionStatus.Confirmed:
            return 'confirmé';
          case InterventionStatus.Denied:
            return 'refusé';
          case InterventionStatus.Closed:
            return 'fermé';
        }
      });
  }

  likeIntervention(intervention: Intervention): void {
    intervention.status$.next(InterventionStatus.Pending);
  }
}
