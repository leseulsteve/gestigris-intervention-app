import { Component, Input } from '@angular/core';

import { Etablissement } from './etablissement';

@Component({
  selector: 'app-etablissement-card-header',
  templateUrl: './etablissement-card-header.component.html',
  styleUrls: ['./etablissement-card-header.component.scss']
})
export class EtablissementCardHeaderComponent {

  @Input() etablissement: Etablissement;

}