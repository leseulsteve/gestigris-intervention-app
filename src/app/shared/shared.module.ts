import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { LoaderComponent } from './loader/loader.component';

import { EtablissementModule } from './etablissement/etablissement.module';
import { InterventionModule } from './intervention/intervention.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    EtablissementModule,
    InterventionModule
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent,
    EtablissementModule,
    InterventionModule
  ]
})
export class SharedModule { }
