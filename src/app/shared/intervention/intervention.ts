import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Etablissement } from '@app/shared/etablissement';

enum InterventionStatus {
  Open = 0,
  Pending = 1,
  Confirmed = 2,
  Denied = 3
}

class Intervention {
  _id: string;
  etablissement: Etablissement;
  date: Date;
  status$: BehaviorSubject<InterventionStatus>;
}

export { Intervention, InterventionStatus };
