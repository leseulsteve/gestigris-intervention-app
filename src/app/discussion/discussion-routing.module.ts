import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { DiscussionSectionComponent } from './discussion-section.component';
import { DiscussionComponent } from './discussion.component';

const routes: Routes = Route.withShell([
  { path: 'discussions', component: DiscussionSectionComponent, data: { title: extract('Discussions') } },
  { path: 'discussion/:id', component: DiscussionComponent, data: { title: extract('Discussion') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DiscussionRoutingModule { }
