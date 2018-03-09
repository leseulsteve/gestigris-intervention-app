import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Etablissement } from './etablissement';

const etablissements = [{
  _id: '1',
  description: 'École secondaire de Neufchâtel',
  tags: ['Secondaire', 'Hotdog']
},
{
  _id: '2',
  description: 'Collège Champigny',
  tags: ['Secondaire', 'Lasagne']
}];

@Injectable()
export class EtablissementService {

  public etablissements$: Observable<Etablissement[]>;

  constructor() {

    this.etablissements$ = of(etablissements);
  }
}
