import { Component, Input } from '@angular/core';

import { Etablissement } from '@app/shared/etablissement';
import { InterventionStatus, Intervention } from './intervention';
import { PlageIntervention } from './intervention.service';

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

  likeIntervention(intervention: Intervention): void {
    intervention.status$.next(InterventionStatus.Pending);
  }
}
