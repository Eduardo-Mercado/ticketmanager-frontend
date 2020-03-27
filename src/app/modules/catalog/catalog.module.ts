import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module/angular-material.module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/modal-popup/modal-popup.module';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CompanyComponent } from './company/company.component';
import { BusinessAgentComponent } from './business-agent/business-agent.component';
import { CustomerComponent } from './customer/customer.component';
import { ImplantationComponent } from './implantation/implantation.component';


@NgModule({
  declarations: [CompanyComponent, BusinessAgentComponent, CustomerComponent, ImplantationComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule
  ]
})
export class CatalogModule { }
