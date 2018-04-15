import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Content } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { find } from 'lodash';

import { DiscussionService, Discussion, Message, NewMessage } from './discussion.service';



@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  @ViewChild(Content) content: Content;
  @ViewChild('messageInput') messageInput: ElementRef;

  discussion$: Observable<Discussion>;
  discussionId: string;
  newMessage: NewMessage;
  private scrollToBottom: Observable<boolean>;
  private sub: Subscription;

  currentUser = {
    _id: '2',
    username: 'Papi Chulo',
    avatar: 'https://robohash.org/papi'
  };

  constructor(
    private route: ActivatedRoute,
    private discussionService: DiscussionService) { }

  ngOnInit() {
    this.discussionId = this.route.snapshot.children[0].children[0].params['id'];
    this.discussion$ = this.discussionService.discussions$
      .map(discussions => find(discussions, discussion => discussion._id === this.discussionId));

    this.resetMessage();

    this.scrollToBottom = this.discussion$
      .mergeMap(discussion => {
        return discussion.messages$.map(() => true);
      });


    this.scrollToBottom.subscribe(() => {
      setTimeout(() => {
        console.log('SCROLL');
        if (this.content.scrollToBottom) {
          this.content.scrollToBottom();
        }
      }, 400);
    });
  }

  onFocus() {
    this.content.resize();
  }

  sendMsg() {
    if (!this.newMessage.content.trim()) { return; }
    this.discussionService.addMessage(this.newMessage);
    this.resetMessage();
    this.focus();
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private resetMessage() {
    this.newMessage = {
      discussionId: this.discussionId,
      content: '',
      author: this.currentUser
    };
  }

}

