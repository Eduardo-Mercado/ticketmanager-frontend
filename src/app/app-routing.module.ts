import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent} from './shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule'
  },
  {
  path: '',
  component: LayoutComponent,
   children: [
    {
       path: 'dashboard',
       loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
       data: { title: 'dashboard', breadcrumb: 'user'}
     },
    {
      path: 'ticket',
      loadChildren: './modules/ticket-manager/ticket-manager.module#TicketManagerModule'
    },
    {
      path: 'catalog',
      loadChildren: './modules/catalog/catalog.module#CatalogModule'
    },
    {
      path: 'security',
      loadChildren: './modules/security/security.module#SecurityModule'
    }
   ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
