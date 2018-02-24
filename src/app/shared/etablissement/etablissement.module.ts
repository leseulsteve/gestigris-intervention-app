import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { EtablissementCardComponent } from './etablissement-card.component';
import { EtablissementService } from './etablissement.service';

import { InterventionModule } from '@app/shared/intervention';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    InterventionModule
  ],
  declarations: [
    EtablissementCardComponent
  ],
  providers: [ EtablissementService],
  exports: [
    EtablissementCardComponent
  ]
})
export class EtablissementModule { }
