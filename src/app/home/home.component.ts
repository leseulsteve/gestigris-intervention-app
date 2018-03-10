import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';

import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';

import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';

import { isNil } from 'lodash';

import { PlageInterventionService, PlageIntervention } from '@app/intervention';

enum CardActions {
  AcceptAll,
  DismissAll,
  RefuseAll
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  plagesIntervention: PlageIntervention[] = [];
  accept$: Subject<CardActions> = new Subject<CardActions>();
  cardActions = CardActions;

  stackConfig: StackConfig;

  constructor(private plageInterventionService: PlageInterventionService) {
    this.stackConfig = {
      transform: (element, x, y, r) => this.onItemMove(element, x, y, r),
      throwOutDistance: (d) => 800,
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
      }
    };
  }

  ngOnInit() {
    this.accept$
      .withLatestFrom(this.plageInterventionService.showcasedPlagesInterventions$)
      .map(([accept, interventions]) => {
        const plage = this.plagesIntervention.pop();
        if (plage) {
          if (accept === CardActions.AcceptAll) {
            this.plageInterventionService.accept(true, plage);
          } else if (accept === CardActions.RefuseAll) {
            this.plageInterventionService.accept(false, plage);
          }
        }
        return interventions.shift();
      })
      .filter(plage => !isNil(plage))
      .subscribe(plage => this.plagesIntervention.push(plage));

    this.accept$.next(CardActions.DismissAll);

    this.plageInterventionService.showcasedPlagesInterventions$.subscribe(console.log)
  }

  onItemMove(element: HTMLElement, x: number, y: number, r: number) {
    let color = '';
    const abs = Math.abs(x);
    const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    const hexCode = this.decimalToHex(min, 2);

    if (x < 0) { color = '#FF' + hexCode + hexCode; }
    else { color = '#' + hexCode + 'FF' + hexCode; }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  // http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d: number, padding: number) {
    let hex = Number(d).toString(16);
    padding = isNil(padding) || isNil(padding) ? padding = 2 : padding;
    while (hex.length < padding) { hex = '0' + hex; }
    return hex;
  }
}
