import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Etablissement } from '@app/etablissement';

enum InterventionStatus {
  Open = 0,
  Pending = 1,
  Confirmed = 2,
  Denied = 3,
  Closed = 4
}

class Intervention {
  _id: string;
  etablissement: Etablissement;
  date: Date;
  status$: BehaviorSubject<InterventionStatus>;
}

export { Intervention, InterventionStatus };
