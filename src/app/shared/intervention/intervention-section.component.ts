import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { InterventionService, PlageIntervention } from './intervention.service';
import { Intervention } from './intervention';

@Component({
  selector: 'app-intervention-section',
  templateUrl: './intervention-section.component.html',
  styleUrls: ['./intervention-section.component.scss']
})
export class InterventionSectionComponent implements OnInit {

  plagesInterventions$: Observable<PlageIntervention[]>;

  constructor(private interventionService: InterventionService) { }

  ngOnInit() {
    this.plagesInterventions$ = this.interventionService.plagesInterventions$;
  }

}
