import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';

import { EtablissementService, Etablissement } from '@app/shared/etablissement';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  etablissements$: Observable<Etablissement[]>;

  constructor(private etablissementService: EtablissementService) { }

  ngOnInit() {
    this.etablissements$ = this.etablissementService.etablissements$;

  }

}
