import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { RelativeTime } from './relative-time.pipe';

import { DiscussionRoutingModule } from './discussion-routing.module';
import { DiscussionService } from './discussion.service';
import { DiscussionSectionComponent } from './discussion-section.component';
import { DiscussionComponent } from './discussion.component';

@NgModule({
  imports: [
    SharedModule,
    DiscussionRoutingModule
  ],
  declarations: [
    DiscussionSectionComponent,
    DiscussionComponent,
    RelativeTime
  ],
  entryComponents: [DiscussionSectionComponent],
  providers: [DiscussionService],
  exports: []
})
export class DiscussionModule { }
