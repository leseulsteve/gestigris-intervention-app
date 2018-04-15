import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skip';

import { assign, chain, sortBy, groupBy, map, find } from 'lodash';
import * as moment from 'moment';

import { discussions as discussionsMock } from './discussion.mocks';
import { messages as messagesMock } from './message.mocks';

export interface Discussion {
  _id: string;
  type: DiscussionType;
  title: string;
  subTitle?: string;
  messages$: Subject<(Message | NewMessage)[]>;
}
export interface Message {
  _id: string;
  date: Date;
  discussionId: string;
  content: string;
  author: { username: string; avatar: string; };
}
export interface NewMessage {
  discussionId: string;
  content: string;
  author: {
    _id: string;
    username: string;
    avatar: string;
  };
}

export enum DiscussionType {
  Team = 0,
  Intervention = 1
}

@Injectable()
export class DiscussionService {

  discussions$: Observable<Discussion[]>;
  discussions: Discussion[] = [];
  messages: Map<string, (Message | NewMessage)[]> = new Map<string, (Message | NewMessage)[]>();

  constructor() {

    const groupedMessages = groupBy(messagesMock, (message: Message) => message.discussionId);
    map(groupedMessages, (messages, discutionId) => {
      this.messages.set(discutionId, sortBy(messages, message => message.date));
    });

    this.discussions$ = of(discussionsMock
      // .sortBy(intervention => moment(intervention.date).startOf('day').format())
      .map(discussion => assign(discussion, { messages$: new BehaviorSubject(this.messages.get(discussion._id)) }))
      .map(discussion => { this.discussions.push(discussion); return discussion; }))
      .publishReplay(1)
      .refCount();
  }

  private getMessages(discussionId: string): Observable<Message[]> {
    return of(sortBy(messagesMock.filter(message => message.discussionId === discussionId),
      message => message.date));
  }

  addMessage(message: NewMessage) {
    const messagesInDiscussion = this.messages.get(message.discussionId);
    messagesInDiscussion.push(assign(message, { date: new Date() }));
    const discussion = find(this.discussions, discussion => discussion._id === message.discussionId);
    discussion.messages$.next(messagesInDiscussion);
  }

}
