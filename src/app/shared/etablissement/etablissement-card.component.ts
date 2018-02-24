import { Component, Input } from '@angular/core';

import { Etablissement } from './etablissement';

@Component({
  selector: 'app-etablissement-card',
  templateUrl: './etablissement-card.component.html',
  styleUrls: ['./etablissement-card.component.scss']
})
export class EtablissementCardComponent {

  @Input() etablissement: Etablissement;


}
