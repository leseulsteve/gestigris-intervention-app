import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FlexLayoutModule
  ],
  exports: [
    IonicModule,
    CommonModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
