import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { interval } from 'rxjs/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Pipe({
  name: 'relativeTime',
})
export class RelativeTime implements PipeTransform {
  transform(value: string) {
    return interval(60000)
      .startWith(0)
      .map(() => moment(value).fromNow());
  }
}
