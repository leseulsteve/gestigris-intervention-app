import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { getDistance } from 'geolib';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { assign } from 'lodash';

import { Etablissement } from './etablissement';

const etablissements = [{
  _id: '1',
  description: 'École secondaire de Neufchâtel',
  tags: ['Secondaire', 'Hotdog'],
  coordinates: {
    lat: 46.83,
    long: -71.34,
    zoomLevel: 14
  }
},
{
  _id: '2',
  description: 'Collège Champigny',
  tags: ['Secondaire', 'Lasagne'],
  coordinates: {
    lat: 46.79,
    long: -71.36,
    zoomLevel: 14
  }
},
{
  _id: '3',
  description: 'Rochebelle',
  tags: ['L\'école', 'du', 'démon'],
  coordinates: {
    lat: 46.79,
    long: -71.29,
    zoomLevel: 14
  }
}];

@Injectable()
export class EtablissementService {

  public etablissements$: Observable<Etablissement[]>;

  constructor(private geolocation: Geolocation) {

    this.etablissements$ = of(etablissements.map(etablissement => assign(etablissement, {
      favorited$: new BehaviorSubject<boolean>(false),
      coordinates: assign(etablissement.coordinates, {
        distance$: this.geolocation.watchPosition()
          .filter(position => position.coords !== undefined)
          .map(position => getDistance(
            { latitude: position.coords.latitude, longitude: position.coords.longitude },
            { latitude: etablissement.coordinates.lat, longitude: etablissement.coordinates.long }
          ))
      })
    })));
  }
}
