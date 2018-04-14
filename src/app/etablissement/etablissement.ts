import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Etablissement {
  _id: string;
  description: string;
  favorited$: BehaviorSubject<boolean>;
  tags: string[];
  coordinates: {
    lat: number;
    long: number;
    zoomLevel: number;
    distance$: Observable<number>;
  };
}
