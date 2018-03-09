import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { EtablissementCardHeaderComponent } from './etablissement-card-header.component';
import { EtablissementService } from './etablissement.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    EtablissementCardHeaderComponent
  ],
  providers: [ EtablissementService],
  exports: [
    EtablissementCardHeaderComponent
  ]
})
export class EtablissementModule { }
