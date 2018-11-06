import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './layouts/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatIconModule,
  MatOptionModule,
  MatSidenavModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatListModule,
  MatMenuModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatListModule,
    MatMenuModule,
    RouterModule
  ],
  declarations: [MainNavComponent, BlankLayoutComponent],
  exports: [MainNavComponent, BlankLayoutComponent]
})
export class CoreModule {
}
