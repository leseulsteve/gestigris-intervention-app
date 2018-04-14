import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { chain } from 'lodash';

import { DiscussionService, Discussion, DiscussionType } from './discussion.service';

@Component({
  selector: 'app-discussion-section',
  templateUrl: './discussion-section.component.html',
  styleUrls: ['./discussion-section.component.scss']
})
export class DiscussionSectionComponent implements OnInit {

  discussions$: Observable<Map<string, Discussion[]>>;
  discussionsTypes$: Observable<string[]>;

  constructor(private discussionService: DiscussionService) { }

  ngOnInit() {
    this.discussions$ = this.discussionService.discussions$
      .map(discussions => {
        const groupedDiscussions = new Map<string, Discussion[]>();
        chain(discussions)
          .groupBy(discussion => discussion.type)
          .map((discussions, type) => groupedDiscussions.set(type, discussions))
          .value();
        return groupedDiscussions;
      });

    this.discussionsTypes$ = this.discussions$
      .map(groupedDiscussions => Array.from(groupedDiscussions.keys()));
  }

  getDiscutionTypeTitle(discussionTypeKey: DiscussionType) {
    return DiscussionType[discussionTypeKey];
  }

}

