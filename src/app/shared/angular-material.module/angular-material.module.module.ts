import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatSnackBarModule,
  MatSortModule,
  MatFormFieldDefaultOptions
} from '@angular/material';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatMenuModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatSortModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatSortModule
  ],
  providers: [
    MatDatepickerModule,
  ]
})

export class AngularMaterialModule { }
