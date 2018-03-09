import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { EtablissementModule } from '../etablissement/etablissement.module';

import { InterventionService } from './intervention.service';
import { PlageInterventionCardComponent } from './plage-intervention-card.component';
import { InterventionRoutingModule } from './intervention-routing.module';
import { InterventionSectionComponent } from './intervention-section.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EtablissementModule,
    InterventionRoutingModule
  ],
  declarations: [
    PlageInterventionCardComponent,
    InterventionSectionComponent
  ],
  providers: [ InterventionService],
  exports: [ PlageInterventionCardComponent]
})
export class InterventionModule { }
