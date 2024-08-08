import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleSingInRoutingModule } from './google-sing-in-routing.module';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GoogleSigInComponent } from './google-sig-in/google-sig-in.component';
@NgModule({
  declarations: [

    GoogleSigInComponent
  ],
  imports: [
    CommonModule,
    GoogleSingInRoutingModule,
    MatSnackBarModule
  ]
})
export class GoogleSingInModule { }
