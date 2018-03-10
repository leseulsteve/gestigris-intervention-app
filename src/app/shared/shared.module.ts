import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    IonicModule,
    CommonModule,
    LoaderComponent,
    FlexLayoutModule
  ]
})
export class SharedModule { }
