import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { EtablissementCardHeaderComponent } from './etablissement-card-header.component';
import { EtablissementService } from './etablissement.service';

@NgModule({
  imports: [
    SharedModule,
    CoreModule
  ],
  declarations: [EtablissementCardHeaderComponent],
  providers: [ EtablissementService],
  exports: [EtablissementCardHeaderComponent]
})
export class EtablissementModule { }
