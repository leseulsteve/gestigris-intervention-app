import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skip';

import { assign, chain, sortBy } from 'lodash';
import * as moment from 'moment';

import { discussions as discussionsMock } from './discussion.mocks';
import { messages as messagesMock } from './message.mocks';

export interface Discussion {
  _id: string;
  type: DiscussionType;
  title: string;
  subTitle?: string;
  messages$: Observable<Message[]>;
}
export interface Message {
  _id: string;
  discussionId: string;
  content: string;
  author: { username: string; avatar: string; };
}

export enum DiscussionType {
  Team = 0,
  Intervention = 1
}

@Injectable()
export class DiscussionService {

  discussions$: Observable<Discussion[]>;

  constructor() {

    this.discussions$ = of(discussionsMock
      // .sortBy(intervention => moment(intervention.date).startOf('day').format())
      .map(discussion => assign(discussion, { messages$: this.getMessages(discussion._id) })))
      .publishReplay(1)
      .refCount();
  }

  private getMessages(discussionId: string): Observable<Message[]> {
    return of(sortBy(messagesMock.filter(message => message.discussionId === discussionId),
      message => message.date));
  }

}
