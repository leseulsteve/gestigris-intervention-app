import { Component, Input } from '@angular/core';

import { Etablissement } from './etablissement';
import { Intervention, InterventionStatus } from '../intervention/intervention'

import { InterventionService } from '../intervention/intervention.service'

@Component({
  selector: 'app-etablissement-card',
  templateUrl: './etablissement-card.component.html',
  styleUrls: ['./etablissement-card.component.scss']
})
export class EtablissementCardComponent {

  @Input() etablissement: Etablissement;

  constructor(private interventionService:InterventionService) {}

  getInterventionStatusIcon (interventionStatus: InterventionStatus): string {
    
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

  likeIntervention (intervention:Intervention): void {
    intervention.status.next(InterventionStatus.Pending);
  }
}
