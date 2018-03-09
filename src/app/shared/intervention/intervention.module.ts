import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { FlexLayoutModule} from '@angular/flex-layout';

import { EtablissementModule } from '../etablissement/etablissement.module';

import { InterventionService } from './intervention.service';
import { PlageInterventionCardComponent } from './plage-intervention-card.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FlexLayoutModule,
    EtablissementModule
  ],
  declarations: [ PlageInterventionCardComponent],
  providers: [ InterventionService],
  exports: [ PlageInterventionCardComponent]
})
export class InterventionModule { }
