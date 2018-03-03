import { BehaviorSubject } from 'rxjs/BehaviorSubject'

enum InterventionStatus {
  Open = 0,
  Pending = 1,
  Confirmed = 2,
  Denied = 3
}

 class Intervention {_id: string;
  etablissementId: string;
  date: Date;
  status: BehaviorSubject<InterventionStatus>;
}

export {Intervention,InterventionStatus }
