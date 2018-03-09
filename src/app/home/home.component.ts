import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import { flatten, compact } from 'lodash';

import { InterventionService, Intervention, PlageIntervention, InterventionStatus } from '@app/shared/intervention';
import { Etablissement } from '@app/shared/etablissement';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  plageIntervention$: Observable<PlageIntervention[]>;
  stackConfig: StackConfig;
  recentCard: string = '';

  constructor(private interventionService: InterventionService) {    
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      // transform: (element, x, y, r) => {
      //   this.onItemMove(element, x, y, r);
      // },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ngOnInit() {

    this.plageIntervention$ = this.interventionService.plagesInterventions$
      .mergeMap(plages => {

        return combineLatest(plages.map(plage => {
          return combineLatest(plage.interventions.map(intervention => intervention.status$))
            .map(interventionsStatuses =>
              interventionsStatuses.filter(status => status === InterventionStatus.Open).length > 0)
            .map(hasOpenStatus => {
              if (hasOpenStatus) {
                return plage;
              }
            });
        }))
        .map(interventions => [compact(interventions)[0]]);
      });
  }
  
  ngAfterViewInit() {
    console.log ("On ngAfterViewInit");
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
  }
  onItemMove(element: any, x: number, y: number, r: number) {
    console.log ("On Item Move");

    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16*16 - abs, 16*16));
    let hexCode = this.decimalToHex(min, 2);
    
    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }
    
  //  element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }
   
  // Connected through HTML
  voteUp(like: boolean) {
    console.log ("On vote up", like);
    // let removedCard = this.cards.pop();
    // this.addNewCards(1);
    // if (like) {
    //   this.recentCard = 'You liked: ' + removedCard.email;
    // } else {
    //   this.recentCard = 'You disliked: ' + removedCard.email;
    // }
  }
   
  // http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d: number, padding: number) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
    
    while (hex.length < padding) {
      hex = "0" + hex;
    }
    
    return hex;
  }
}
