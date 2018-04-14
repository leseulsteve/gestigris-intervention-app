import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { DiscussionSectionComponent } from './discussion-section.component';

const routes: Routes = Route.withShell([
  { path: 'discussions', component: DiscussionSectionComponent, data: { title: extract('Discussions') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DiscussionRoutingModule { }
