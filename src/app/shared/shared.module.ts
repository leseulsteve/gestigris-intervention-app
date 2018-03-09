import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { FlexLayoutModule} from '@angular/flex-layout';

import { LoaderComponent } from './loader/loader.component';

import { EtablissementModule } from './etablissement/etablissement.module';
import { InterventionModule } from './intervention/intervention.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    EtablissementModule,
    InterventionModule,
    FlexLayoutModule
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent,
    EtablissementModule,
    InterventionModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
