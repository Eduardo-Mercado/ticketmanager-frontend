import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CompanyComponent } from './company/company.component';
import { BusinessAgentComponent } from './business-agent/business-agent.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [{
  path: '',
  component: CompanyComponent
},
{
  path: 'agent',
  component: BusinessAgentComponent
},
{
  path: 'customer',
  component: CustomerComponent
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
