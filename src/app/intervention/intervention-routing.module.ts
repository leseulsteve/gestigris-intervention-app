import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { InterventionSectionComponent } from './intervention-section.component';

const routes: Routes = Route.withShell([
  { path: 'interventions', component: InterventionSectionComponent, data: { title: extract('Interventions') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class InterventionRoutingModule { }
