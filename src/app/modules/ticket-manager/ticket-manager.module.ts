import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module/angular-material.module.module';

import { TicketManagerRoutingModule } from './ticket-manager-routing.module';
import { TicketViewComponent } from './ticket-view/ticket-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TicketComponent } from './ticket/ticket.component';

@NgModule({
  declarations: [TicketComponent, TicketViewComponent],
  imports: [
    CommonModule,
    TicketManagerRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule
  ]
})
export class TicketManagerModule { }
