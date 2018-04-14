import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { DiscussionRoutingModule } from './discussion-routing.module';
import { DiscussionService } from './discussion.service';
import { DiscussionSectionComponent } from './discussion-section.component';

@NgModule({
  imports: [
    SharedModule,
    DiscussionRoutingModule
  ],
  declarations: [DiscussionSectionComponent],
  entryComponents: [DiscussionSectionComponent],
  providers: [DiscussionService],
  exports: []
})
export class DiscussionModule { }
