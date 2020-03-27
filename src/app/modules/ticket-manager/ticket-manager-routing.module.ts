import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketComponent } from './ticket/ticket.component';
import { TicketViewComponent } from './ticket-view/ticket-view.component';

const routes: Routes = [{
  path: '',
  component: TicketComponent
},
{
  path: 'view',
  component: TicketViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketManagerRoutingModule { }
