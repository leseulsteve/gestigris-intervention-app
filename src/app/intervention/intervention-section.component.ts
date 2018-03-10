import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PlageIntervention, PlageInterventionService } from './plage-intervention.service';

@Component({
  selector: 'app-intervention-section',
  templateUrl: './intervention-section.component.html',
  styleUrls: ['./intervention-section.component.scss']
})
export class InterventionSectionComponent implements OnInit {

  plagesInterventions$: Observable<PlageIntervention[]>;

  constructor(private plageInterventionService: PlageInterventionService) { }

  ngOnInit() {
    this.plagesInterventions$ = this.plageInterventionService.plagesInterventions$;
  }

}
