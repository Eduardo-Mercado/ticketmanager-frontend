import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { RolComponent } from './rol/rol.component';
import { UsersComponent } from './users/users.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module/angular-material.module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/modal-popup/modal-popup.module';

@NgModule({
  declarations: [RolComponent, UsersComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule
  ]
})
export class SecurityModule { }
