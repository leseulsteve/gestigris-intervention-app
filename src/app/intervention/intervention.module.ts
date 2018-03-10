import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { EtablissementModule } from '@app/etablissement';

import { InterventionService } from './intervention.service';
import { PlageInterventionService } from './plage-intervention.service';

import { PlageInterventionCardComponent } from './plage-intervention-card.component';
import { InterventionRoutingModule } from './intervention-routing.module';
import { InterventionSectionComponent } from './intervention-section.component';

@NgModule({
  imports: [
    SharedModule,
    EtablissementModule,
    InterventionRoutingModule
  ],
  declarations: [
    PlageInterventionCardComponent,
    InterventionSectionComponent
  ],
  providers: [ InterventionService, PlageInterventionService],
  exports: [ PlageInterventionCardComponent]
})
export class InterventionModule { }
