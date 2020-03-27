import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module/angular-material.module.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [UserComponent, AdminComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule
  ]
})
export class DashboardModule { }
