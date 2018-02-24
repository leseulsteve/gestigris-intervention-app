import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterventionService } from './intervention.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ InterventionService]
})
export class InterventionModule { }
