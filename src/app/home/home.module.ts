import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SwingModule } from 'angular2-swing';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { InterventionModule } from '@app/intervention';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SwingModule,
    CoreModule,
    SharedModule,
    InterventionModule,
    HomeRoutingModule
  ],
  entryComponents: [
    HomeComponent
  ],
  declarations: [
    HomeComponent
  ],
  providers: []
})
export class HomeModule { }
